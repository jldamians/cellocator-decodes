'use strict';

var base = require('../utils/convertBase.js');
var tramaGps = require('../utils/handleTrama.js');
var helper = require('../helpers/');

function Ack(){
	this.mcgp = '4D434750';
	this.messageType = '04';
	this.unitId = null;
	this.commandNumerator = null;
	this.authenticationCode = '00000000';
	this.actionCode = '00';
	this.messageNumeratorOfMessageReceived = null;
	this.unusedBytes = '0000000000000000000000';
	this.errorDetectionCode = null;
}

(function(){
	/**
	* ACK de confirmacion de trama. Se generara para confirmarle al gps la recepcion de cada trama
	* @param {integer} unitId: serie del equipo gps
	* @param {integer} commandNumerator: correlativo de las veces que se va ejecutando un comando
	* @param {integer} messageNumerator: messageNumerator de la trama recibida (consultar modulo cellocator)
	* @return {Buffer}
	*/
	this.genericAcknowledgeMessage = function(unitId, commandNumerator, messageNumerator) {
		this.unitId = helper.lpad(base.decToHex(unitId), 8);
		this.unitId = base.reverseHexadecimal(this.unitId);

		this.commandNumerator = commandNumerator > 255 ? 0 : commandNumerator;
		this.commandNumerator = helper.lpad(this.commandNumerator, 2);
		
		this.messageNumeratorOfMessageReceived = helper.lpad(base.decToHex(messageNumerator), 2);

		var command = '';

		this.errorDetectionCode = tramaGps.checksum([
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

	this.ack = function(unit, commandNumerator, messageNumerator) {
	    return this.genericAcknowledgeMessage(unit, commandNumerator, messageNumerator);
	}
}).call(Ack.prototype);

module.exports = Ack;
