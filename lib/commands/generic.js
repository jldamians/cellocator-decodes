'use strict';

var base = require('../utils/convertBase'),
	tramaGps = require('../utils/handleTrama'),
	helper = require('../helpers/');

var GENERIC_COMMAND_VALUES = require('../constants/').genericCommandValues;

var MCGP = '4D434750',
	MESSAGE_TYPE = '00',
	AUTHENTICATION_CODE = '00000000',
	COMMAND_SPECIFIC_DATA_FIELD = '00000000';

var Generic = (function(){
  /*
  * generar comandos genéricos
  * @param {integer} uid: serie del equipo gps
  * @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
  * @param {hexadecimal} codefield:
  * @param {hexadecimal} firsttwice:
  * @param {hexadecimal} secondtwice:
  * @return {Buffer}
  */
	function _genericCommands(uid, numerator, codefield, firsttwice, secondtwice) {
		var unitId = null;
		var commandNumerator = null;
		var commandCodeField = null;
    var firstCommandDataFieldRepeatsTwice = null;
		var secondCommandDataFieldRepeatsTwice = null;
		var errorDetectionCode = null;

		unitId = helper.lpad(base.decToHex(uid), 8);
		unitId = base.reverseHexadecimal(unitId);

		commandNumerator = numerator > 255 ? 0 : numerator;
		commandNumerator = helper.lpad(base.decToHex(commandNumerator), 2);

		commandCodeField = helper.lpad(codefield, 4);
    firstCommandDataFieldRepeatsTwice = helper.lpad(firsttwice, 4);
		secondCommandDataFieldRepeatsTwice = helper.lpad(secondtwice, 4);

		errorDetectionCode = tramaGps.checksum([
			MESSAGE_TYPE,
			unitId,
			commandNumerator,
			AUTHENTICATION_CODE,
			commandCodeField,
			firstCommandDataFieldRepeatsTwice,
			secondCommandDataFieldRepeatsTwice,
			COMMAND_SPECIFIC_DATA_FIELD
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

		var sendCommand = '';

		sendCommand = [
			MCGP,
			MESSAGE_TYPE,
			unitId,
			commandNumerator,
			AUTHENTICATION_CODE,
			commandCodeField,
			firstCommandDataFieldRepeatsTwice,
			secondCommandDataFieldRepeatsTwice,
			COMMAND_SPECIFIC_DATA_FIELD,
			errorDetectionCode
		].join('');

		return new Buffer(sendCommand, 'hex');
	}


  return function(uid, numerator, type) {
    var command = {};

    if (typeof type === 'object') {
      command = type;
    } else {
      command = GENERIC_COMMAND_VALUES[type];
    }

    return _genericCommands(
      uid,
      numerator,
      command.codeField,
      command.dataFieldFirst,
      command.dataFieldSecond
    );
  };
})();

module.exports = Generic;
