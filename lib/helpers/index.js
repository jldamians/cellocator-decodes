'use strict';

var Helper = (function(){
	return {
	   /**
		* Quitar caracteres especiales
		* @param {string} str: cadena que ser va a limpiar
		* @return {string}
		*/
	  	noSpecialCharacters: function(str) {
			var from 	= "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
				to   	= "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc",
				mapping = {};

		  	for(var i = 0, j = from.length; i < j; i++ ){
		      	mapping[from.charAt(i)] = to.charAt(i);
		  	}

	      	var result = [];

	      	for(var i = 0, j = str.length; i < j; i++) {
	          	var c = str.charAt(i);
	          	if(mapping.hasOwnProperty(str.charAt(i))){
	              	result.push(mapping[c]);
	          	}
	          	else{
	              	result.push(c);
	          	}
	      	}

	      	return result.join('');
	  	},
	   /**
		* Cambiar cadena a mayúsculas
		* @param {string} value: valor a convertir
		* @return {string}
		*/
		toUpperCase: function(value){
			var valueUpper = '' ;

	        // false => 0, -0, NaN, null, undefined, "", ''
	        // true  => resto de valores
			if ( value ) {
				valueUpper = value.toUpperCase();
			}

			return valueUpper;
		},

	   /**
		* Quita los espacios de los lados
		* @param {string} value: valor al que se quitara espacios
		* @return {string}
		*/
	    trim: function(value){
	        var valueTrim = '' ;
	        // false => 0, -0, NaN, null, undefined, "", ''
	        // true  => resto de valores
	        if ( value ) {
	            valueTrim = value.toString().trim() ;
	        }

	        return valueTrim ;
	    },

	   /**
		* Completa con caracteres el lado izquierdo de la cadena
		* @param {string} number: valor que sera completado con caracteres
		* @param {integer} width: longitud que debe lograr la cadena
		* @param {string} character: caracter que servira de relleno
		* @return {string}
		*/
	    lpad: function(number, width, character){
			number    = number + '';
			character = character || '0';

			return number.length >= width ? number : new Array(width - number.length + 1).join(character) + number;
		}
	};
})();

module.exports = Helper;