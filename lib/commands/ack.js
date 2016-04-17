'use strict';

var base = require('../utils/convertBase.js'),
	tramaGps = require('../utils/handleTrama.js'),
	helper = require('../helpers/');

var MCGP = '4D434750',
	MESSAGE_TYPE = '04',
	AUTHENTICATION_CODE = '00000000',
	ACTION_CODE = '00',
	UNUSED_BYTES = '0000000000000000000000';

var Ack = (function(){
   /*
	* ACK de confirmacion de trama. Se generara para confirmarle al gps la recepcion de cada trama
	* @param {integer} UID: serie del equipo gps
	* @param {integer} numerator: correlativo de las veces que se va ejecutando un comando
	* @param {integer} message: messageNumerator de la trama recibida (consultar modulo "/decode")
	* @return {Buffer}
	*/
	function _genericAcknowledgeMessage(UID, numerator, message) {
		var unitId = null;
		var commandNumerator = null;
		var messageNumeratorOfMessageReceived = null;
		var errorDetectionCode = null;		

		unitId = helper.lpad(base.decToHex(UID), 8);
		unitId = base.reverseHexadecimal(unitId);

		commandNumerator = numerator > 255 ? 0 : numerator;
		commandNumerator = helper.lpad(base.decToHex(commandNumerator), 2);

		messageNumeratorOfMessageReceived = helper.lpad(base.decToHex(message), 2);

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

		var sendCommand = null;

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
	}

	return {
		ack: function(unitId, commandNumerator, messageNumerator) {
	    	return _genericAcknowledgeMessage(unitId, commandNumerator, messageNumerator);
		}
	};
})();

module.exports = Ack;
