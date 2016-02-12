

function Util(){
   /**
	* Convierte valores hexadecimales ha valores decimales
	* @param {string} hex: valor hexadecimal
	* @return {integer}
	*/
	this.hexToDec = function(hex){
		var _dec = 0 ;
		// false => 0, -0, NaN, null, undefined, "", ''
		// true  => resto de valores
		if ( hex ) {
			_dec = parseInt(hex, 16) ;
		}

		return _dec ;
	}

   /**
	* Convierte valores decimales ha valores hexadecimales
	* @param {integer} dec: valor decimal
	* @return {string}
	*/
	this.decToHex = function(dec){
		var _hex = '' ;
		// false => 0, -0, NaN, null, undefined, "", ''
		// true  => resto de valores
		if ( dec ) {
			_hex = parseInt(dec, 10).toString(16) ;
			_hex = this.toUpperCase(_hex) ;
		}

		return _hex ;
	}

   /**
	* Convierte valores hexadecimales ha valores Ascii
	* @param {string} hex: valor hexadecimal
	* @return {string}
	*/
	this.hexToAscii = function(hex){
		var _ascii = '' ;

		hex = this.trim(hex) ;
		// false => 0, -0, NaN, null, undefined, "", ''
		// true  => resto de valores
		if ( hex ) {
			for (var i = 0; i < hex.length; i += 2) {
				_ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
			};
		}

		return _ascii;
	}

   /**
	* Convierte valores hexadecimales ha valores binarios
	* @param {string} hex: valor hexadecimal
	* @return {string}
	*/
	this.hexToBin = function(hex){
		var _bin = '' ;

        hex = this.trim(hex) ;
		// false => 0, -0, NaN, null, undefined, "", ''
		// true  => resto de valores
		if ( hex ) {
			_bin = parseInt(hex, 16).toString(2) ;
		}

		return _bin ;
	}

   /**
	* Convierte valores binarios ha valores hexadecimales
	* @param {string} bin: valor binario
	* @return {string}
	*/
	this.binToHex = function(bin){
		var _hex = '' ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( bin ) {
			_hex = parseInt(bin, 2).toString(16) ;
			_hex = this.toUpperCase(_hex) ;
		}

		return _hex ;
	}

   /**
	* Convierte valores binarios ha valores decimales
	* @param {string} bin: valor binario
	* @return {integer}
	*/
	this.binToDec = function(bin){
		var _dec = 0 ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( bin ) {
			_dec = parseInt(bin, 2) ;
		}

		return _dec ;
	}

   /**
	* Convierte valores decimales ha valores binarios
	* @param {integer} dec: valor decimal
	* @return {string}
	*/
	this.decToBin = function(dec){
		var _bin = '' ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( dec ) {
			_bin = parseInt(dec, 10).toString(2) ;
		}

		return _bin ;
	}

   /**
	* Invertir la cadena hexadecimal en pares
	* @param {string} hex: valor hexadecimal
	* @return {string}
	*/
	this.reverseHexadecimal = function(hex){
		var _hex = '' ;

        hex = this.trim(hex) ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( hex ) {
			if ( hex.length % 2 != 0) {
				hex = '0' + hex ;
			}

		    for (var i = 0; i < hex.length - 1; i += 2) {
		      	_hex =  hex.substring(i, i+2) + _hex ;
		    }

		    _hex = this.toUpperCase(_hex) ;
		}

	    return _hex ;
	}

   /**
	* Sumando valor decimal a un valor hexadecimal
	* @param {string} hex: valor hexadecimal
	* @param {integer} dec: valor decimal
	* @return {string}
	*/
	this.hexAddDec = function(hex, dec){
		var _hex = '0' ;
		var _dec = 0 ;

        hex = this.trim(hex) ;
		dec = dec || 0 ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( hex ) {
			_dec = this.hexToDec(hex) + dec ;
			_hex = this.decToHex(_dec) ;
			_hex = this.toUpperCase(_hex) ;
		}

		return _hex ;
	}

   /**
	* Negar cada valor binario de la cadena
	* @param {string} bin: valor binario
	* @return {string}
	*/
	this.notBinary = function(bin){
		var _bin = '' ;
        // false => 0, -0, NaN, null, undefined, "", ''
        // true  => resto de valores
		if ( bin ) {
		    for (var i = 0; i < bin.length; i++){
			    if( bin.substring(i, i+1) == '0' ) {
			        _bin += '1';
			    }
			    else {
			        _bin += '0';
			    }
		    }
		}

		return _bin ;
	}
}

module.exports = Util;