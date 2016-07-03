'use strict';

var GENERIC_COMMAND_TYPES = require('../index.js').constants.genericCommandTypes;
var Generic = require('../index.js').commands.Generic;

var reset = new Generic(1208671, 10, GENERIC_COMMAND_TYPES.reset),
    status = new Generic(470683, 15, GENERIC_COMMAND_TYPES.status),
    activateImmobilizer = new Generic(354331, 5, GENERIC_COMMAND_TYPES.activateImmobilizer);

console.log(reset.getCommand());//reset
console.log(status.getCommand());//status
console.log(activateImmobilizer.getCommand());//activateImmobilizer


