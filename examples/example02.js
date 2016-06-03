'use strict';

var GENERIC_COMMAND_TYPES = require('../index.js').constants.genericCommandTypes;
var Generic = require('../').commands.generic;

console.log(Generic('ABCDEF', 'FE', GENERIC_COMMAND_TYPES.reset));//reset
console.log(Generic('AEIOU', 'AB', GENERIC_COMMAND_TYPES.status));//status
console.log(Generic('ABCDEF', 'AB', GENERIC_COMMAND_TYPES.activateImmobilizer));//activateImmobilizer


