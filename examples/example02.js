'use strict';

var GENERIC_COMMAND_TYPES = require('../index.js').constants.genericCommandTypes;
var Generic = require('../index.js').commands.Generic;

console.log(new Generic(1208671, 10, GENERIC_COMMAND_TYPES.reset));//reset
console.log(new Generic(470683, 15, GENERIC_COMMAND_TYPES.status));//status
console.log(new Generic(354331, 5, GENERIC_COMMAND_TYPES.activateImmobilizer));//activateImmobilizer


