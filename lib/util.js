'use strict';

var ConvertBase = require('convert-base');

var Util = (function(){
	var _converter = new ConvertBase();

   /**
	* Cambiar de base
	* @param {string} value: valor a convertir
	* @param {interger} from: base actual 
	* @param {interger} to: base a la que se convertira
	* @return {string}
	*/
	function _changeBase(value, from, to) {
		return _converter.convert(value, from, to);
	}

   /**
	* Cambiar cadena a mayúsculas
	* @param {string} value: valor a convertir
	* @return {string}
	*/
	function _toUpperCase(value){
		var valueUpper = '' ;

		value = _trim(value) ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( value ) {
			valueUpper = value.toUpperCase();
		}

		return valueUpper;
	}

   /**
	* Quita los espacios de los lados
	* @param {string} value: valor al que se quitara espacios
	* @return {string}
	*/
    function _trim(value){
        var valueTrim = '' ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
        if ( value ) {
            valueTrim = value.toString().trim() ;
        }

        return valueTrim ;
    }

   /**
	* Completa con caracteres el lado izquierdo de la cadena
	* @param {string} number: valor que sera completado con caracteres
	* @param {integer} width: longitud que debe lograr la cadena
	* @param {string} character: caracter que servira de relleno
	* @return {string}
	*/
    function _lpad(number, width, character){
		number    = number + '';
		character = character || '0';

		return number.length >= width ? number : new Array(width - number.length + 1).join(character) + number;
	}

	return {
	   /**
		* Convierte valores hexadecimales ha valores decimales
		* @param {string} hexadecimal: valor hexadecimal
		* @return {integer}
		*/
		hexToDec: function(hexadecimal){
			var decimal = 0 ;

			hexadecimal = _trim(hexadecimal) ;

			// false => 0, -0, NaN, null, undefined, "", ''
			// true  => resto de valores
			if ( hexadecimal ) {
				decimal = _changeBase(hexadecimal, 16, 10);
			}

			return decimal ;
		},

	   /**
		* Convierte valores decimales ha valores hexadecimales
		* @param {integer} decimal: valor decimal
		* @return {string}
		*/
		decToHex: function(decimal){
			var hexadecimal = '' ;

			// false => 0, -0, NaN, null, undefined, "", ''
			// true  => resto de valores
			if ( decimal ) {
				hexadecimal = _toUpperCase(_changeBase(decimal, 10, 16));
			}

			return hexadecimal ;
		},

	   /**
		* Convierte valores hexadecimales ha valores Ascii
		* @param {string} hexadecimal: valor hexadecimal
		* @return {string}
		*/
		hexToAscii: function(hexadecimal){
			var ascii = '' ;

			hexadecimal = _trim(hexadecimal) ;

			// false => 0, -0, NaN, null, undefined, "", ''
			// true  => resto de valores
			if ( hexadecimal ) {
				for (var i = 0; i < hexadecimal.length; i += 2) {
					ascii += String.fromCharCode(parseInt(hexadecimal.substr(i, 2), 16));
				};
			}

			return ascii;
		},

	   /**
		* Convierte valores hexadecimales ha valores binarios
		* @param {string} hexadecimal: valor hexadecimal
		* @return {string}
		*/
		hexToBin: function(hexadecimal){
			var binary = '' ;

	        hexadecimal = _trim(hexadecimal) ;

			// false => 0, -0, NaN, null, undefined, "", ''
			// true  => resto de valores
			if ( hexadecimal ) {
				binary = _changeBase(hexadecimal, 16, 2);

				// cada valor hexadecimal, representa 4 valores binarios
				binary = _lpad(binary, hexadecimal.length * 4) ; 
			}

			return binary ;
		},

	   /**
		* Convierte valores binarios ha valores hexadecimales
		* @param {string} binary: valor binario
		* @return {string}
		*/
		binToHex: function(binary){
			var hexadecimal = '' ;

	        // false => 0, -0, NaN, null, undefined, "", ''
	        // true  => resto de valores
			if ( binary ) {
				hexadecimal = _changeBase(binary, 2, 16);
				hexadecimal = _toUpperCase(hexadecimal) ;
			}

			return hexadecimal ;
		},

	   /**
		* Convierte valores binarios ha valores decimales
		* @param {string} binary: valor binario
		* @return {integer}
		*/
		binToDec: function(binary){
			var decimal = 0 ;

	        // false => 0, -0, NaN, null, undefined, "", ''
	        // true  => resto de valores
			if ( binary ) {
				decimal = _changeBase(binary, 2, 10);
			}

			return decimal ;
		},

	   /**
		* Convierte valores decimales ha valores binarios
		* @param {integer} decimal: valor decimal
		* @return {string}
		*/
		decToBin: function(decimal){
			var binary = '' ;

	        // false => 0, -0, NaN, null, undefined, "", ''
	        // true  => resto de valores
			if ( decimal ) {
				binary = _changeBase(decimal, 10, 2);
			}

			return binary ;
		},

	   /**
		* Invertir la cadena hexadecimal en pares
		* @param {string} hexadecimal: valor hexadecimal
		* @return {string}
		*/
		reverseHexadecimal: function(hexadecimal){
			var reverse = '' ;

	        hexadecimal = _trim(hexadecimal) ;
	        // false => 0, -0, NaN, null, undefined, "", ''
	        // true  => resto de valores
			if ( hexadecimal ) {
				if ( hexadecimal.length % 2 != 0) {
					hexadecimal = '0' + hexadecimal ;
				}

			    for (var i = 0; i < hexadecimal.length - 1; i += 2) {
			      	reverse =  hexadecimal.substring(i, i+2) + reverse ;
			    }

			    reverse = _toUpperCase(reverse) ;
			}

		    return reverse ;
		},

	   /**
		* Sumando valor decimal a un valor hexadecimal
		* @param {string} hexadecimal: valor hexadecimal
		* @param {integer} decimal: valor decimal
		* @return {string}
		*/
		hexAddDec: function(hexadecimal, decimal){
			var hexadecimalFinal = '0' ;
			var decimalFinal = 0 ;

			hexadecimal = _trim(hexadecimal) ;
			decimal = decimal || 0 ;

	        // false => 0, -0, NaN, null, undefined, "", ''
	        // true  => resto de valores
			if ( hexadecimal ) {
				decimalFinal     = this.hexToDec(hexadecimal) + decimal ;
				hexadecimalFinal = _toUpperCase(this.decToHex(decimalFinal)) ;
			}

			return hexadecimalFinal ;
		},

	   /**
		* Negar cada valor binario de la cadena
		* @param {string} binary: valor binario
		* @return {string}
		*/
		notBinary: function(binary){
			var investBinary = '' ;
	        // false => 0, -0, NaN, null, undefined, "", ''
	        // true  => resto de valores
			if ( binary ) {
			    for (var i = 0; i < binary.length; i++){
				    if( binary.substring(i, i+1) === '0' ) {
				        investBinary += '1';
				    }
				    else {
				        investBinary += '0';
				    }
			    }
			}

			return investBinary ;
		},

	   /**
		* Realiza la suma de comprobacion de trama (Checksum)
		* @param {string} toUpperCasema: trama hexadecimal
		* @return {string}
		*/
	    checksum: function(trama){
	        var code = 0;

	        for (var i = 0; i < trama.length - 1; i += 2) {
	            code += this.hexToDec(trama.substr(i, 2));
	        };

	        code = '00' + this.decToHex(code) ;

	        // LSB => Bit Menos Significativo
	        var lsb  = code.substr(-2) ;

	        return lsb;
	    }
	};
})();

module.exports = Util;
