'use strict';

module.exports = {
	reset: {commandCodeField: '0202', commandDataField: '0202'},
	status: {commandCodeField: '0000', commandDataField: '0000'},
	activateImmobilizer: {commandCodeField: '0303', commandDataField: '0505'},
	deactivateImmobilizer: {commandCodeField: '0303', commandDataField: '1515'},
	activateEngineStop: {commandCodeField: '0707', commandDataField: '0000'},
	deactivateEngineStop: {commandCodeField: '0707', commandDataField: '0101'},
	transparentModeStart: {commandCodeField: '1515', commandDataField: '0101'},
	transparentModeStop: {commandCodeField: '1515', commandDataField: '0000'},
	eraseLogMemory: {commandCodeField: '0D0D', commandDataField: '0000'},
	activateSiren: {commandCodeField: '0303', commandDataField: '1010'},
	deactivateSiren: {commandCodeField: '0303', commandDataField: '0000'},
}