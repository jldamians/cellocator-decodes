'use strict';

var helper = require('../helpers/'),
    base = require('../utils/convertBase'),
    tramaGps = require('../utils/handleTrama');

function Ack (uuid, command, message) {
  this.uuid = uuid;
  this.command = command;
  this.message = message;

  return this.genericAcknowledgeMessage();
}

Ack.prototype.MCGP = '4D434750';
Ack.prototype.MESSAGE_TYPE = '04';
Ack.prototype.AUTHENTICATION_CODE = '00000000';
Ack.prototype.ACTION_CODE = '00';
Ack.prototype.UNUSED_BYTES = '0000000000000000000000';

/*
* ACK de confirmacion de trama. Se generara para confirmarle al gps la recepción de cada trama
* @param {integer} uid: serie del equipo gps
* @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
* @param {integer} message: messageNumerator de la trama recibida (consultar modulo "/decode")
* @return {Buffer}
*/

Ack.prototype.genericAcknowledgeMessage = function() {
  var unitId = null,
      commandNumerator = null,
      messageNumeratorOfMessageReceived = null,
      errorDetectionCode = null,
      sendCommand = null;

  unitId = helper.lpad(base.decToHex(this.uuid), 8);
  unitId = base.reverseHexadecimal(unitId);

  commandNumerator = this.command > 255 ? 0 : this.command;
  commandNumerator = helper.lpad(base.decToHex(commandNumerator), 2);

  messageNumeratorOfMessageReceived = helper.lpad(base.decToHex(this.message), 2);

  errorDetectionCode = tramaGps.checksum([
    this.MESSAGE_TYPE,
    unitId,
    commandNumerator,
    this.AUTHENTICATION_CODE,
    this.ACTION_CODE,
    messageNumeratorOfMessageReceived,
    this.UNUSED_BYTES
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
    this.MCGP,
    this.MESSAGE_TYPE,
    unitId,
    commandNumerator,
    this.AUTHENTICATION_CODE,
    this.ACTION_CODE,
    messageNumeratorOfMessageReceived,
    this.UNUSED_BYTES,
    errorDetectionCode
  ].join('');

  return new Buffer(sendCommand, 'hex');
};

module.exports = Ack;
