'use strict';

var assert = require('assert');
var util = require('../lib/util');

describe('Util', function() {
  describe('hexToDec({0xFF, 0xff, FF, ff})', function() {
    it('should return 255', function() {
      assert.equal(255, util.hexToDec('0xFF'));
      assert.equal(255, util.hexToDec('0xff'));
      assert.equal(255, util.hexToDec('FF'));
      assert.equal(255, util.hexToDec('ff'));
    });
  });

	describe('decToHex({255})', function() {
		it('should return FF', function(){
			assert.equal('FF', util.decToHex(255));
		});
	});

	describe('hexToBin({FF, ff})', function() {
		it('should return 11111111', function(){
			assert.equal('11111111', util.hexToBin('FF'));
			assert.equal('11111111', util.hexToBin('ff'));
		});
	});

	describe('binToHex({11111111})', function() {
		it('should return FF', function(){
			assert.equal('FF', util.binToHex('11111111'));
		});
	});

	describe('binToDec({11111111})', function() {
		it('should return 255', function(){
			assert.equal('255', util.binToDec('11111111'));
		});
	});

	describe('decToBin({255})', function() {
		it('should return 11111111', function(){
			assert.equal('11111111', util.decToBin(255));
		});
	});

	describe('reverseHexadecimal({9C6, 9c6})', function() {
		it('should return C609', function(){
			assert.equal('C609', util.reverseHexadecimal('9C6'));
			assert.equal('C609', util.reverseHexadecimal('9c6'));
		});
	});

	describe('hexAddDec({[FF, 10]})', function() {
		it('should return 109', function(){
			assert.equal('109', util.hexAddDec('FF', 10));
		});
	});

	describe('notBinary({011001})', function() {
		it('should return 100110', function(){
			assert.equal('100110', util.notBinary('011001'));
		});
	});

	describe('checksum({0057E70700000000000002020202000000000000})', function() {
		it('should return 4D', function(){
			assert.equal('4D', util.checksum('0057E70700000000000002020202000000000000'));
		});
	});


});