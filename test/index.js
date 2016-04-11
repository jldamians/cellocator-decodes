'use strict';

var assert = require('assert');
var convert = require('../lib/utils/convertBase');
var trama = require('../lib/utils/handleTrama');

describe('handleDate', function() {
  describe('hexToDec({0xFF, 0xff, FF, ff})', function() {
    it('should return 255', function() {
      assert.equal(255, convert.hexToDec('0xFF'));
      assert.equal(255, convert.hexToDec('0xff'));
      assert.equal(255, convert.hexToDec('FF'));
      assert.equal(255, convert.hexToDec('ff'));
    });
  });

	describe('decToHex({255})', function() {
		it('should return FF', function(){
			assert.equal('FF', convert.decToHex(255));
		});
	});

	describe('hexToBin({FF, ff})', function() {
		it('should return 11111111', function(){
			assert.equal('11111111', convert.hexToBin('FF'));
			assert.equal('11111111', convert.hexToBin('ff'));
		});
	});

	describe('binToHex({11111111})', function() {
		it('should return FF', function(){
			assert.equal('FF', convert.binToHex('11111111'));
		});
	});

	describe('binToDec({11111111})', function() {
		it('should return 255', function(){
			assert.equal('255', convert.binToDec('11111111'));
		});
	});

	describe('decToBin({255})', function() {
		it('should return 11111111', function(){
			assert.equal('11111111', convert.decToBin(255));
		});
	});

	describe('reverseHexadecimal({9C6, 9c6})', function() {
		it('should return C609', function(){
			assert.equal('C609', convert.reverseHexadecimal('9C6'));
			assert.equal('C609', convert.reverseHexadecimal('9c6'));
		});
	});

	describe('hexAddDec({[FF, 10]})', function() {
		it('should return 109', function(){
			assert.equal('109', convert.hexAddDec('FF', 10));
		});
	});

	describe('notBinary({011001})', function() {
		it('should return 100110', function(){
			assert.equal('100110', convert.notBinary('011001'));
		});
	});

	describe('checksum({0057E70700000000000002020202000000000000})', function() {
		it('should return 4D', function(){
			assert.equal('4D', trama.checksum('0057E70700000000000002020202000000000000'));
		});
	});
});