'use strict';

var TYPES = require('./genericCommandTypes');

var genericCommandValues = {};

genericCommandValues[TYPES.reset] = {
  codeField: '0202', dataField: '0202'
};
genericCommandValues[TYPES.status] = {
  codeField: '0000', dataField: '0000'
};
genericCommandValues[TYPES.activateImmobilizer] = {
  codeField: '0303', dataField: '0505'
};
genericCommandValues[TYPES.deactivateImmobilizer] = {
  codeField: '0303', dataField: '1515'
};
genericCommandValues[TYPES.activateEngineStop] = {
  codeField: '0707', dataField: '0000'
};
genericCommandValues[TYPES.deactivateEngineStop] = {
  codeField: '0707', dataField: '0101'
};
genericCommandValues[TYPES.transparentModeStart] = {
  codeField: '1515', dataField: '0101'
};
genericCommandValues[TYPES.transparentModeStop] = {
  codeField: '1515', dataField: '0000'
};
genericCommandValues[TYPES.eraseLogMemory] = {
  codeField: '0D0D', dataField: '0000'
};
genericCommandValues[TYPES.activateSiren] = {
  codeField: '0303', dataField: '1010'
};
genericCommandValues[TYPES.deactivateSiren] = {
  codeField: '0303', dataField: '0000'
};

module.exports = genericCommandValues;
