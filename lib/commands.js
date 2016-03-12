'use strict';

var util = require('./util');

function Commands(){
	this.mcgp = '4D434750';
	this.messageType = null;
	this.unitId = null;
	this.commandNumerator = null;
	this.authenticationCode = '00000000';
	this.commandCodeField = null;
	this.firstCommandDataFieldRepeatsTwice = null;
	this.secondCommandDataFieldRepeatsTwice = '0000';
	this.commandSpecificDataField = '00000000';
	this.errorDetectionCode = null;

	this.actionCode = '00';
	this.messageNumeratorOfMessageReceived = null;
	this.unusedBytes = '0000000000000000000000';
}

(function(){
	this.genericCommands = function(unit, numerator, codefield, firsttwice) {
		this.unitId = '00000000' + util.decToHex(unit);
		this.unitId = this.unitId.substr(-8);
		this.unitId = util.reverseHexadecimal(this.unitId);

		this.commandNumerator = numerator > 255 ? 0 : numerator;
		this.commandNumerator = '00' + util.decToHex(this.commandNumerator);
		this.commandNumerator = this.commandNumerator.substr(-2);

		this.commandCodeField = ('0000' + codefield).substr(-4);
		this.firstCommandDataFieldRepeatsTwice = ('0000' + firsttwice).substr(-4);

		this.messageType = '00';

		var command = '';

		this.errorDetectionCode = util.checksum([
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

	/**
	* ACK de confirmacion de trama. Se generara para confirmarle al gps la recepcion de cada trama
	* @param {integer} unitId: serie del equipo gps
	* @param {integer} commandNumerator: correlativo de las veces que se va ejecutando un comando
	* @param {integer} messageNumerator: messageNumerator de la trama recibida (consultar modulo cellocator)
	* @return {Buffer}
	*/
	this.genericAcknowledgeMessage = function(unitId, commandNumerator, messageNumerator) {
		this.unitId = '00000000' + util.decToHex(unitId);
		this.unitId = this.unitId.substr(-8);
		this.unitId = util.reverseHexadecimal(this.unitId);
		
		// El commandNumerator solo puede llegar hasta 255 (FF hex), luego se tendra que reiniciar a 0 (0 hex)
		this.commandNumerator = commandNumerator > 255 ? 0 : commandNumerator;
		this.commandNumerator = '00' + util.decToHex(this.commandNumerator);
		this.commandNumerator = this.commandNumerator.substr(-2);

		this.messageNumeratorOfMessageReceived = '00' + util.decToHex(messageNumerator);
		this.messageNumeratorOfMessageReceived = this.messageNumeratorOfMessageReceived.substr(-2);

		this.messageType = '04';

		var command = '';

		this.errorDetectionCode = util.checksum([
			this.messageType,
			this.unitId,
			this.commandNumerator,
			this.authenticationCode,
			this.actionCode,
			this.messageNumeratorOfMessageReceived,
			this.unusedBytes
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

		command = [
			this.mcgp,
			this.messageType,
			this.unitId,
			this.commandNumerator,
			this.authenticationCode,
			this.actionCode,
			this.messageNumeratorOfMessageReceived,
			this.unusedBytes,
			this.errorDetectionCode
		].join('');

		return new Buffer(command, 'hex');
	}

	this.reset = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0202', '0202');
	}

	this.status = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0000', '0000');
	}

	this.activateImmobilizer = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0303', '0505');
	}

	this.deactivateImmobilizer = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0303', '1515');
	}

	this.activateGradualEngineStop = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0707', '0000');
	}

	this.deactivateGradualEngineStop = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0707', '0101');
	}

	this.transparentModeStartPermanently = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '1515', '0101');
	}

	this.transparentModeStopPermanently = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '1515', '0000');
	}

	/**
	* Limpiar las tramas almacenadas en la memoria del gps
	* @param {integer} unit: serie del equipo gps
	* @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
	* @return {Buffer}
	*/
	this.eraseTrackingLogFromMemory = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0D0D', '0000');
	}

	this.activateSiren = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0303', '1010');
	}

	this.deactivateSiren = function(unit, numerator) {
	    return this.genericCommands(unit, numerator, '0303', '0000');
	}
}).call(Commands.prototype);

exports.Commands = new Commands();
