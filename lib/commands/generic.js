'use strict';

var base = require('../utils/convertBase'),
	tramaGps = require('../utils/handleTrama'),
	helper = require('../helpers/');

var COMMAND_TYPES = require('../constants/').commandTypes;

var MCGP = '4D434750',
	MESSAGE_TYPE = '004',
	AUTHENTICATION_CODE = '00000000',
	SECOND_COMMAND_DATA_FIELD_REPEATS_TWICE = '0000',
	COMMAND_SPECIFIC_DATA_FIELD = '00000000';
	
var Generic = (function(){

	function _genericCommands(UID, numerator, codefield, firsttwice) {
		var unitId = null;
		var commandNumerator = null;
		var commandCodeField = null;
		var firstCommandDataFieldRepeatsTwice = null;
		var errorDetectionCode = null;

		unitId = helper.lpad(base.decToHex(UID), 8);
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

	return {
		reset: function(unit, numerator) {
			var command = COMMAND_TYPES.reset;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		status: function(unit, numerator) {
			var command = COMMAND_TYPES.status;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		activateImmobilizer: function(unit, numerator) {
			var command = COMMAND_TYPES.activateImmobilizer;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		deactivateImmobilizer: function(unit, numerator) {
			var command = COMMAND_TYPES.deactivateImmobilizer;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		activateEngineStop: function(unit, numerator) {
			var command = COMMAND_TYPES.activateEngineStop;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		deactivateEngineStop: function(unit, numerator) {
			var command = COMMAND_TYPES.deactivateEngineStop;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		transparentModeStart: function(unit, numerator) {
			var command = COMMAND_TYPES.transparentModeStart;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		transparentModeStop: function(unit, numerator) {
			var command = COMMAND_TYPES.transparentModeStop;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},
		
		/**
		* Limpiar las tramas almacenadas en la memoria del gps
		* @param {integer} unit: serie del equipo gps
		* @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
		* @return {Buffer}
		*/
		eraseLogMemory: function(unit, numerator) {
			var command = COMMAND_TYPES.eraseLogMemory;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		activateSiren: function(unit, numerator) {
			var command = COMMAND_TYPES.activateSiren;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		},

		deactivateSiren: function(unit, numerator) {
			var command = COMMAND_TYPES.deactivateSiren;
		    return _genericCommands(unit, numerator, command.codeField, command.dataField);
		}
	}
})();

module.exports = Generic;
