'use strict';

var base = require('../utils/convertBase'),
	tramaGps = require('../utils/handleTrama'),
	helper = require('../helpers/');

var GENERIC_COMMAND_VALUES = require('../constants/').genericCommandValues;

var MCGP = '4D434750',
	MESSAGE_TYPE = '004',
	AUTHENTICATION_CODE = '00000000',
	SECOND_COMMAND_DATA_FIELD_REPEATS_TWICE = '0000',
	COMMAND_SPECIFIC_DATA_FIELD = '00000000';

var Generic = (function(){

	function _genericCommands(uid, numerator, codefield, firsttwice) {
		var unitId = null;
		var commandNumerator = null;
		var commandCodeField = null;
		var firstCommandDataFieldRepeatsTwice = null;
		var errorDetectionCode = null;

		unitId = helper.lpad(base.decToHex(uid), 8);
		unitId = base.reverseHexadecimal(unitId);

		commandNumerator = numerator > 255 ? 0 : numerator;
		commandNumerator = helper.lpad(base.decToHex(commandNumerator), 2);

		commandCodeField = helper.lpad(codefield, 4);
		firstCommandDataFieldRepeatsTwice = helper.lpad(firsttwice, 4);

		errorDetectionCode = tramaGps.checksum([
			MESSAGE_TYPE,
			unitId,
			commandNumerator,
			AUTHENTICATION_CODE,
			commandCodeField,
			firstCommandDataFieldRepeatsTwice,
			SECOND_COMMAND_DATA_FIELD_REPEATS_TWICE,
			COMMAND_SPECIFIC_DATA_FIELD
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

		var sendCommand = '';

		sendCommand = [
			MCGP,
			MESSAGE_TYPE,
			unitId,
			commandNumerator,
			AUTHENTICATION_CODE,
			commandCodeField,
			firstCommandDataFieldRepeatsTwice,
			SECOND_COMMAND_DATA_FIELD_REPEATS_TWICE,
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

    return _genericCommands(uid, numerator, command.codeField, command.dataField);
  };
})();

module.exports = Generic;
