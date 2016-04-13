'use strict';

var base = require('../utils/convertBase');
var tramaGps = require('../utils/handleTrama');
var helper = require('../helpers/');
var COMMAND_TYPES = require('../constants/').commandTypes;

function Generic(){
	this.mcgp = '4D434750';
	this.messageType = '00';
	this.unitId = null;
	this.commandNumerator = null;
	this.authenticationCode = '00000000';
	this.commandCodeField = null;
	this.firstCommandDataFieldRepeatsTwice = null;
	this.secondCommandDataFieldRepeatsTwice = '0000';
	this.commandSpecificDataField = '00000000';
	this.errorDetectionCode = null;
}

(function(){
	// Generar comandos con tamaño constante de 25 Bytes
	this.genericCommands = function(unit, numerator, codefield, firsttwice) {
		this.unitId = helper.lpad(base.decToHex(unit), 8);
		this.unitId = base.reverseHexadecimal(this.unitId);

		this.commandNumerator = numerator > 255 ? 0 : numerator;
		this.commandNumerator = helper.lpad(this.commandNumerator, 2);

		this.commandCodeField = helper.lpad(codefield, 4);
		this.firstCommandDataFieldRepeatsTwice = helper.lpad(firsttwice, 4);

		var command = '';

		this.errorDetectionCode = tramaGps.checksum([
			this.messageType,
			this.unitId,
			this.commandNumerator,
			this.authenticationCode,
			this.commandCodeField,
			this.firstCommandDataFieldRepeatsTwice,
			this.secondCommandDataFieldRepeatsTwice,
			this.commandSpecificDataField
		].join(''));

		command = [
			this.mcgp,
			this.messageType,
			this.unitId,
			this.commandNumerator,
			this.authenticationCode,
			this.commandCodeField,
			this.firstCommandDataFieldRepeatsTwice,
			this.secondCommandDataFieldRepeatsTwice,
			this.commandSpecificDataField,
			this.errorDetectionCode
		].join('');
		
		return new Buffer(command, 'hex');
	}

	this.reset = function(unit, numerator) {
		var command = COMMAND_TYPES.reset;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.status = function(unit, numerator) {
		var command = COMMAND_TYPES.status;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.activateImmobilizer = function(unit, numerator) {
		var command = COMMAND_TYPES.activateImmobilizer;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.deactivateImmobilizer = function(unit, numerator) {
		var command = COMMAND_TYPES.deactivateImmobilizer;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.activateEngineStop = function(unit, numerator) {
		var command = COMMAND_TYPES.activateEngineStop;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.deactivateEngineStop = function(unit, numerator) {
		var command = COMMAND_TYPES.deactivateEngineStop;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.transparentModeStart = function(unit, numerator) {
		var command = COMMAND_TYPES.transparentModeStart;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.transparentModeStop = function(unit, numerator) {
		var command = COMMAND_TYPES.transparentModeStop;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	/**
	* Limpiar las tramas almacenadas en la memoria del gps
	* @param {integer} unit: serie del equipo gps
	* @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
	* @return {Buffer}
	*/
	this.eraseLogMemory = function(unit, numerator) {
		var command = COMMAND_TYPES.eraseLogMemory;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.activateSiren = function(unit, numerator) {
		var command = COMMAND_TYPES.activateSiren;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}

	this.deactivateSiren = function(unit, numerator) {
		var command = COMMAND_TYPES.deactivateSiren;
	    return this.genericCommands(unit, numerator, command.commandCodeField, command.commandDataField);
	}
}).call(Generic.prototype);

module.exports = Generic;
