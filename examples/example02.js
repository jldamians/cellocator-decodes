'use strict';

var GENERIC_COMMAND_TYPES = require('../index.js').constants.genericCommandTypes;
var generic = require('../').commands.generic;

console.log(generic(1208671, 10, GENERIC_COMMAND_TYPES.reset));//reset
console.log(generic(470683, 15, GENERIC_COMMAND_TYPES.status));//status
console.log(generic(354331, 5, GENERIC_COMMAND_TYPES.activateImmobilizer));//activateImmobilizer


