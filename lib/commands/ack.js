'use strict';

var helper = require('../helpers/'),
    base = require('../utils/convertBase'),
    tramaGps = require('../utils/handleTrama');

var MCGP = '4D434750',
    MESSAGE_TYPE = '04',
    AUTHENTICATION_CODE = '00000000',
    ACTION_CODE = '00',
    UNUSED_BYTES = '0000000000000000000000';

function Ack (uuid, command, message) {
  this.uuid = uuid;
  this.command = command;
  this.message = message;
}

/*
* ACK de confirmacion de trama. Se generara para confirmarle al gps la recepción de cada trama
* @param {integer} uid: serie del equipo gps
* @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
* @param {integer} message: messageNumerator de la trama recibida (consultar modulo "/decode")
* @return {Buffer}
*/

Ack.prototype.getCommand = function() {
  var unitId,
      commandNumerator,
      messageNumeratorOfMessageReceived,
      errorDetectionCode,
      sendCommand;

  unitId = helper.lpad(base.decToHex(this.uuid), 8);
  unitId = base.reverseHexadecimal(unitId);

  commandNumerator = this.command > 255 ? 0 : this.command;
  commandNumerator = helper.lpad(base.decToHex(commandNumerator), 2);

  messageNumeratorOfMessageReceived = helper.lpad(base.decToHex(this.message), 2);

  errorDetectionCode = tramaGps.checksum([
    MESSAGE_TYPE,
    unitId,
    commandNumerator,
    AUTHENTICATION_CODE,
    ACTION_CODE,
    messageNumeratorOfMessageReceived,
    UNUSED_BYTES
  ].join(''));

  /*
    4D434750                -> 04 bytes
    04                      -> 01 bytes
    81C90800                -> 04 bytes
    14                      -> 01 bytes
    00000000                -> 04 bytes
    00                      -> 01 bytes
    16                      -> 01 bytes
    0000000000000000000000  -> 11 bytes
    80                      -> 01 bytes
    ===================================
                               28 bytes
  */

  sendCommand = [
    MCGP,
    MESSAGE_TYPE,
    unitId,
    commandNumerator,
    AUTHENTICATION_CODE,
    ACTION_CODE,
    messageNumeratorOfMessageReceived,
    UNUSED_BYTES,
    errorDetectionCode
  ].join('');

  return new Buffer(sendCommand, 'hex');
};

module.exports = Ack;
