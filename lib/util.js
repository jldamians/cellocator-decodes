'use strict';

var ConvertBase = require('convert-base') ;


function Util(){

	var converter = new ConvertBase();

   /**
	* Convierte valores hexadecimales ha valores decimales
	* @param {string} hexadecimal: valor hexadecimal
	* @return {integer}
	*/
	this.hexToDec = function(hexadecimal){
		var decimal = 0 ;

		hexadecimal = trim(hexadecimal) ;

		// false => 0, -0, NaN, null, undefined, "", ''
		// true  => resto de valores
		if ( hexadecimal ) {
			//decimal = parseInt(hexadecimal, 16) ;
			decimal = converter.convert(hexadecimal, 16, 10);
		}

		return decimal ;
	}

   /**
	* Convierte valores decimales ha valores hexadecimales
	* @param {integer} decimal: valor decimal
	* @return {string}
	*/
	this.decToHex = function(decimal){
		var hexadecimal = '' ;

		// false => 0, -0, NaN, null, undefined, "", ''
		// true  => resto de valores
		if ( decimal ) {
			hexadecimal = toUpperCase(converter.convert(decimal, 10, 16));
			//hexadecimal = parseInt(decimal, 10).toString(16) ;
		}

		return hexadecimal ;
	}

   /**
	* Convierte valores hexadecimales ha valores Ascii
	* @param {string} hexadecimal: valor hexadecimal
	* @return {string}
	*/
	this.hexToAscii = function(hexadecimal){
		var ascii = '' ;

		hexadecimal = trim(hexadecimal) ;

		// false => 0, -0, NaN, null, undefined, "", ''
		// true  => resto de valores
		if ( hexadecimal ) {
			for (var i = 0; i < hexadecimal.length; i += 2) {
				ascii += String.fromCharCode(parseInt(hexadecimal.substr(i, 2), 16));
			};
		}

		return ascii;
	}

   /**
	* Convierte valores hexadecimales ha valores binarios
	* @param {string} hexadecimal: valor hexadecimal
	* @return {string}
	*/
	this.hexToBin = function(hexadecimal){
		var binary = '' ;

        hexadecimal = trim(hexadecimal) ;

		// false => 0, -0, NaN, null, undefined, "", ''
		// true  => resto de valores
		if ( hexadecimal ) {
			binary = converter.convert(hexadecimal, 16, 2);
			//binary = parseInt(hexadecimal, 16).toString(2) ;
		}

		return binary ;
	}

   /**
	* Convierte valores binarios ha valores hexadecimales
	* @param {string} binary: valor binario
	* @return {string}
	*/
	this.binToHex = function(binary){
		var hexadecimal = '' ;

        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( binary ) {
			hexadecimal = converter.convert(binary, 2, 16);
			//hexadecimal = parseInt(binary, 2).toString(16) ;
			hexadecimal = toUpperCase(hexadecimal) ;
		}

		return hexadecimal ;
	}

   /**
	* Convierte valores binarios ha valores decimales
	* @param {string} binary: valor binario
	* @return {integer}
	*/
	this.binToDec = function(binary){
		var decimal = 0 ;

        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( binary ) {
			decimal = converter.convert(binary, 2, 10);
			//decimal = parseInt(binary, 2) ;
		}

		return decimal ;
	}

   /**
	* Convierte valores decimales ha valores binarios
	* @param {integer} decimal: valor decimal
	* @return {string}
	*/
	this.decToBin = function(decimal){
		var binary = '' ;

        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( decimal ) {
			binary = converter.convert(decimal, 10, 2);
			//binary = parseInt(decimal, 10).toString(2) ;
		}

		return binary ;
	}

   /**
	* Invertir la cadena hexadecimal en pares
	* @param {string} hexadecimal: valor hexadecimal
	* @return {string}
	*/
	this.reverseHexadecimal = function(hexadecimal){
		var reverse = '' ;

        hexadecimal = trim(hexadecimal) ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( hexadecimal ) {
			if ( hexadecimal.length % 2 != 0) {
				hexadecimal = '0' + hexadecimal ;
			}

		    for (var i = 0; i < hexadecimal.length - 1; i += 2) {
		      	reverse =  hexadecimal.substring(i, i+2) + reverse ;
		    }

		    reverse = toUpperCase(reverse) ;
		}

	    return reverse ;
	}

   /**
	* Sumando valor decimal a un valor hexadecimal
	* @param {string} hexadecimal: valor hexadecimal
	* @param {integer} decimal: valor decimal
	* @return {string}
	*/
	this.hexAddDec = function(hexadecimal, decimal){
		var hexadecimalFinal = '0' ;
		var decimalFinal     = 0 ;

		hexadecimal = trim(hexadecimal) ;
		decimal     = decimal || 0 ;

        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( hexadecimal ) {
			decimalFinal     = this.hexToDec(hexadecimal) + decimal ;
			hexadecimalFinal = toUpperCase(this.decToHex(decimalFinal)) ;
		}

		return hexadecimalFinal ;
	}

   /**
	* Negar cada valor binario de la cadena
	* @param {string} binary: valor binario
	* @return {string}
	*/
	this.notBinary = function(binary){
		var investBinary = '' ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( binary ) {
		    for (var i = 0; i < binary.length; i++){
			    if( binary.substring(i, i+1) == '0' ) {
			        investBinary += '1';
			    }
			    else {
			        investBinary += '0';
			    }
		    }
		}

		return investBinary ;
	}

   /**
	* Cambiar cadena a mayúsculas
	* @param {string} value: valor a convertir
	* @return {string}
	*/
	function toUpperCase(value){
		var valueUpper = '' ;

		value = trim(value) ;
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
    function trim(value){
        var valueTrim = '' ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
        if ( value ) {
            valueTrim = value.trim() ;
        }

        return valueTrim ;
    }
}

module.exports = Util;