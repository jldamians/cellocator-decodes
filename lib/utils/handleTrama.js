'use strict';

var base = require('./convertBase');
var helper = require('../helpers/');

var HandleTrama = (function(){
	return {
	   /**
		* Realiza la suma de comprobacion de trama (Checksum)
		* @param {string} toUpperCasema: trama hexadecimal
		* @return {string}
		*/
	    checksum: function(trama){
	        var code = 0;

	        for (var i = 0; i < trama.length - 1; i += 2) {
	            code += base.hexToDec(trama.substr(i, 2));
	        };

	        code = '00' + base.decToHex(code) ;

	        // LSB => Bit Menos Significativo
	        var lsb  = code.substr(-2) ;

	        return lsb;
	    },
	    splitTrama: function(trama, separator) {
			trama = trama || '' ;
			separator = separator || '4d434750' ;

			var tramas = trama.split(separator) ;
			var new_tramas = [] ;

			tramas.forEach(function(element, index, array){
				if( element ) {
					new_tramas.push(separator + element);
				}
			}) ;

			return new_tramas ;
	    },
		brandGps: function(trama){
			trama = trama || '' ;
			
			var cell  = trama.substr(0, 8) ;
				cell = base.hexToAscii(cell) ;
				cell = helper.toUpperCase(cell) ;

		    var skyp = base.hexToAscii(trama) ;
			    skyp = skyp.split(',') ;
			    skyp = skyp[0].substr(-5) ;
			    skyp = helper.toUpperCase(skyp) ;

			var marca = '' ;

			if ( cell == 'MCGP' ) {
				// MCGP - formato transmision cellocator
				marca = 'cellocator' ;
			}
			else if( skyp == 'GPRMC' ) { 
				// GPRMC - formato de transmision skypatrol
				marca = 'skypatrol' ;
			}

			return marca ;
		}
	};
})();

module.exports = HandleTrama;