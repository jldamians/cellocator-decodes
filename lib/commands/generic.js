'use strict';

var helper = require('../helpers/'),
    constants = require('../constants/'),
    base = require('../utils/convertBase'),
    tramaGps = require('../utils/handleTrama');

function Generic (uuid, numerator, command) {
  this.uuid = uuid;
  this.numerator = numerator;
  this.command = (typeof command === 'object') ? command : this.GENERIC_COMMAND_VALUES[command];

  return this.genericCommands();
}

Generic.prototype.MCGP = '4D434750';
Generic.prototype.MESSAGE_TYPE = '00';
Generic.prototype.AUTHENTICATION_CODE = '00000000';
Generic.prototype.COMMAND_SPECIFIC_DATA_FIELD = '00000000';
Generic.prototype.GENERIC_COMMAND_VALUES = constants.genericCommandValues;

/*
* generar comandos genéricos
* @param {integer} uid: serie del equipo gps
* @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
* @param {hexadecimal} codefield:
* @param {hexadecimal} firsttwice:
* @param {hexadecimal} secondtwice:
* @return {Buffer}
*/

Generic.prototype.genericCommands = function() {
  var unitId = null,
      commandNumerator = null,
      commandCodeField = null,
      firstCommandDataFieldRepeatsTwice = null,
      secondCommandDataFieldRepeatsTwice = null,
      errorDetectionCode = null,
      sendCommand = '';

  unitId = helper.lpad(base.decToHex(this.uuid), 8);
  unitId = base.reverseHexadecimal(unitId);

  commandNumerator = this.numerator > 255 ? 0 : this.numerator;
  commandNumerator = helper.lpad(base.decToHex(commandNumerator), 2);

  commandCodeField = helper.lpad(this.command.codeField, 4);
  firstCommandDataFieldRepeatsTwice = helper.lpad(this.command.dataFieldFirst, 4);
  secondCommandDataFieldRepeatsTwice = helper.lpad(this.command.dataFieldSecond, 4);

  errorDetectionCode = tramaGps.checksum([
    this.MESSAGE_TYPE,
    unitId,
    commandNumerator,
    this.AUTHENTICATION_CODE,
    commandCodeField,
    firstCommandDataFieldRepeatsTwice,
    secondCommandDataFieldRepeatsTwice,
    this.COMMAND_SPECIFIC_DATA_FIELD
  ].join(''));

  /*
    4D434750                -> 04 bytes
    04                      -> 01 bytes
    81C90800                -> 04 bytes
    14                      -> 01 bytes
    00000000                -> 04 bytes
    0202                    -> 02 bytes
    0202                    -> 02 bytes
    0000                    -> 02 bytes
    00000000                -> 04 bytes
    4D                      -> 01 bytes
    ===================================
                               25 bytes
  */

  sendCommand = [
    this.MCGP,
    this.MESSAGE_TYPE,
    unitId,
    commandNumerator,
    this.AUTHENTICATION_CODE,
    commandCodeField,
    firstCommandDataFieldRepeatsTwice,
    secondCommandDataFieldRepeatsTwice,
    this.COMMAND_SPECIFIC_DATA_FIELD,
    errorDetectionCode
  ].join('');

  return new Buffer(sendCommand, 'hex');
}

module.exports = Generic;
