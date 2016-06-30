'use strict';

var Convert = require('convert-base'),
    helper = require('../helpers/');

var converter = new Convert();

/**
* Cambiar de base
* @param {string} value: valor a convertir
* @param {interger} from: base actual
* @param {interger} to: base a la que se convertira
* @return {string}
*/
function changeBase(value, from, to) {
  return converter.convert(value, from, to);
}

/**
* Convierte valores hexadecimales ha valores decimales
* @param {string} hexadecimal: valor hexadecimal
* @return {integer}
*/
exports.hexToDec = function(hexadecimal){
  var decimal = 0;

  hexadecimal = helper.trim(hexadecimal);

  // false => 0, -0, NaN, null, undefined, "", ''
  // true  => resto de valores
  if ( hexadecimal ) {
    decimal = changeBase(hexadecimal, 16, 10);
  }

  return decimal;
},

/**
* Convierte valores decimales ha valores hexadecimales
* @param {integer} decimal: valor decimal
* @return {string}
*/
exports.decToHex = function(decimal){
  var hexadecimal = '';

  // false => 0, -0, NaN, null, undefined, "", ''
  // true  => resto de valores
  if ( decimal ) {
    hexadecimal = helper.toUpperCase(changeBase(decimal, 10, 16));
  }

  return hexadecimal;
},

/**
* Convierte valores hexadecimales ha valores Ascii
* @param {string} hexadecimal: valor hexadecimal
* @return {string}
*/
exports.hexToAscii = function(hexadecimal){
  var ascii = '';

  hexadecimal = helper.trim(hexadecimal);

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
exports.hexToBin = function(hexadecimal){
  var binary = '' ;

  hexadecimal = helper.trim(hexadecimal);

  // false => 0, -0, NaN, null, undefined, "", ''
  // true  => resto de valores
  if ( hexadecimal ) {
    binary = changeBase(hexadecimal, 16, 2);

    // cada valor hexadecimal, representa 4 valores binarios
    binary = helper.lpad(binary, hexadecimal.length * 4);
  }

  return binary;
},

/**
* Convierte valores binarios ha valores hexadecimales
* @param {string} binary: valor binario
* @return {string}
*/
exports.binToHex = function(binary){
  var hexadecimal = '';

  // false => 0, -0, NaN, null, undefined, "", ''
  // true  => resto de valores
  if ( binary ) {
    hexadecimal = changeBase(binary, 2, 16);
    hexadecimal = helper.toUpperCase(hexadecimal);
  }

  return hexadecimal;
},

/**
* Convierte valores binarios ha valores decimales
* @param {string} binary: valor binario
* @return {integer}
*/
exports.binToDec = function(binary){
  var decimal = 0;

  // false => 0, -0, NaN, null, undefined, "", ''
  // true  => resto de valores
  if ( binary ) {
    decimal = changeBase(binary, 2, 10);
  }

  return decimal;
},

/**
* Convierte valores decimales ha valores binarios
* @param {integer} decimal: valor decimal
* @return {string}
*/
exports.decToBin = function(decimal){
  var binary = '';

  // false => 0, -0, NaN, null, undefined, "", ''
  // true  => resto de valores
  if ( decimal ) {
    binary = changeBase(decimal, 10, 2);
  }

  return binary;
},

/**
* Invertir la cadena hexadecimal en pares
* @param {string} hexadecimal: valor hexadecimal
* @return {string}
*/
exports.reverseHexadecimal = function(hexadecimal){
  var reverse = '';

  hexadecimal = helper.trim(hexadecimal) ;
  // false => 0, -0, NaN, null, undefined, "", ''
  // true  => resto de valores
  if ( hexadecimal ) {
    if ( hexadecimal.length % 2 != 0) {
      hexadecimal = '0' + hexadecimal;
    }

    for (var i = 0; i < hexadecimal.length - 1; i += 2) {
      reverse =  hexadecimal.substring(i, i+2) + reverse;
    }

    reverse = helper.toUpperCase(reverse);
  }

  return reverse;
},

/**
* Sumando valor decimal a un valor hexadecimal
* @param {string} hexadecimal: valor hexadecimal
* @param {integer} decimal: valor decimal
* @return {string}
*/
exports.hexAddDec = function(hexadecimal, decimal){
  var hexadecimalFinal = '0';
  var decimalFinal = 0;

  hexadecimal = helper.trim(hexadecimal);
  decimal = decimal || 0;

  // false => 0, -0, NaN, null, undefined, "", ''
  // true  => resto de valores
  if ( hexadecimal ) {
    decimalFinal = this.hexToDec(hexadecimal) + decimal;
    hexadecimalFinal = helper.toUpperCase(this.decToHex(decimalFinal));
  }

  return hexadecimalFinal;
},

/**
* Negar cada valor binario de la cadena
* @param {string} binary: valor binario
* @return {string}
*/
exports.notBinary = function(binary){
  var investBinary = '';

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

  return investBinary;
}
