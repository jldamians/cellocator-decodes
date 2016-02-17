'use strict';

var util = require('./lib/util');

function Commands(){
	this.mcgp                               = '4D434750' ;
	this.messageType                        = '00' ;
	this.authenticationCode                 = '00000000' ;
	this.commandSpecificDataField           = '00000000' ;
	this.secondCommandDataFieldRepeatsTwice = '0000' ;

	this.unitId                            = null ;
	this.commandNumerator                  = null ;
	this.commandCodeField                  = null ;
	this.firstCommandDataFieldRepeatsTwice = null ;
	this.errorDetectionCode                = null ;
}

Commands.prototype.generic = function(unit, numerator, codefield, firsttwice) {
	this.unitId                            = '00000000' + util.decToHex(unit);
	this.unitId                            = this.unitId.substr(-8);
	this.unitId                            = util.reverseHexadecimal(this.unitId);
	this.commandNumerator                  = ('00' + numerator).substr(-2);
	this.commandCodeField                  = ('0000' + codefield).substr(-4);
	this.firstCommandDataFieldRepeatsTwice = ('0000' + firsttwice).substr(-4);

	var command = '';

	this.errorDetectionCode = util.checksum([
		this.messageType,
		this.unitId,
		this.commandNumerator,
		this.authenticationCode,
		this.commandCodeField,
		this.firstCommandDataFieldRepeatsTwice,
		this.secondCommandDataFieldRepeatsTwice,
		this.commandSpecificDataField
	].join(''));

	command = [
		this.mcgp,
		this.messageType,
		this.unitId,
		this.commandNumerator,
		this.authenticationCode,
		this.commandCodeField,
		this.firstCommandDataFieldRepeatsTwice,
		this.secondCommandDataFieldRepeatsTwice,
		this.commandSpecificDataField,
		this.errorDetectionCode
	].join('');

	return new Buffer(command, 'hex');
}

Commands.prototype.reset = function(unit, numerator) {
    return this.generic(unit, numerator, '0202', '0202') ;
}

Commands.prototype.status = function(unit, numerator) {
    return this.generic(unit, numerator, '0000', '0000') ;
}

Commands.prototype.activateImmobilizer = function(unit, numerator) {
    return this.generic(unit, numerator, '0303', '0505') ;
}

Commands.prototype.deactivateImmobilizer = function(unit, numerator) {
    return this.generic(unit, numerator, '0303', '1515') ;
}

Commands.prototype.activateGradualEngineStop = function(unit, numerator) {
    return this.generic(unit, numerator, '0707', '0000') ;
}

Commands.prototype.deactivateGradualEngineStop = function(unit, numerator) {
    return this.generic(unit, numerator, '0707', '0101') ;
}

Commands.prototype.transparentModeStartPermanently = function(unit, numerator) {
    return this.generic(unit, numerator, '1515', '0101') ;
}

Commands.prototype.transparentModeStopPermanently = function(unit, numerator) {
    return this.generic(unit, numerator, '1515', '0000') ;
}

Commands.prototype.eraseTrackingLogFromMemory = function(unit, numerator) {
    return this.generic(unit, numerator, '0D0D', '0000') ;
}

Commands.prototype.activateSiren = function(unit, numerator) {
    return this.generic(unit, numerator, '0303', '1010') ;
}

Commands.prototype.deactivateSiren = function(unit, numerator) {
    return this.generic(unit, numerator, '0303', '0000') ;
}

module.exports = new Commands() ;