'use strict';

var base = require('../utils/convertBase.js');
var tramaGps = require('../utils/handleTrama.js');
var helper = require('../helpers/');

var Ack = (function(){
	// constantes hexadecimales con longitud fija
	var MCGP = '4D434750';
	var MESSAGETYPE = '04';
	var AUTHENTICATIONCODE = '00000000';
	var ACTIONCODE = '00';
	var UNUSEDBYTES = '0000000000000000000000';

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
			MESSAGETYPE,
			unitId,
			commandNumerator,
			AUTHENTICATIONCODE,
			ACTIONCODE,
			messageNumeratorOfMessageReceived,
			UNUSEDBYTES
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
			MESSAGETYPE,
			unitId,
			commandNumerator,
			AUTHENTICATIONCODE,
			ACTIONCODE,
			messageNumeratorOfMessageReceived,
			UNUSEDBYTES,
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
