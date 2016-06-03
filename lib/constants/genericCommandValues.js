'use strict';

var TYPES = require('./genericCommandTypes');

var genericCommandValues = {};

genericCommandValues[TYPES.reset] = {
  codeField: '0202', dataFieldFirst: '0202', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.status] = {
  codeField: '0000', dataFieldFirst: '0000', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.activateImmobilizer] = {
  codeField: '0303', dataFieldFirst: '0505', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.deactivateImmobilizer] = {
  codeField: '0303', dataFieldFirst: '1515', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.activateEngineStop] = {
  codeField: '0707', dataFieldFirst: '0000', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.deactivateEngineStop] = {
  codeField: '0707', dataFieldFirst: '0101', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.transparentModeStart] = {
  codeField: '1515', dataFieldFirst: '0101', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.transparentModeStop] = {
  codeField: '1515', dataFieldFirst: '0000', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.eraseLogMemory] = {
  codeField: '0D0D', dataFieldFirst: '0000', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.activateSiren] = {
  codeField: '0303', dataFieldFirst: '1010', dataFieldSecond: '0000'
};
genericCommandValues[TYPES.deactivateSiren] = {
  codeField: '0303', dataFieldFirst: '0000', dataFieldSecond: '0000'
};

module.exports = genericCommandValues;
