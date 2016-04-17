'use strict';

module.exports = {
	reset: {codeField: '0202', dataField: '0202'},
	status: {codeField: '0000', dataField: '0000'},
	activateImmobilizer: {codeField: '0303', dataField: '0505'},
	deactivateImmobilizer: {codeField: '0303', dataField: '1515'},
	activateEngineStop: {codeField: '0707', dataField: '0000'},
	deactivateEngineStop: {codeField: '0707', dataField: '0101'},
	transparentModeStart: {codeField: '1515', dataField: '0101'},
	transparentModeStop: {codeField: '1515', dataField: '0000'},
	eraseLogMemory: {codeField: '0D0D', dataField: '0000'},
	activateSiren: {codeField: '0303', dataField: '1010'},
	deactivateSiren: {codeField: '0303', dataField: '0000'},
}