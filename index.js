'use strict';

var command = require('./lib/commands') ;

console.log('reset => ' + command.reset(517975, 0)) ;
console.log('activateImmobilizer => ' + command.activateImmobilizer(517975, 118)) ;
console.log('eraseTrackingLogFromMemory=> ' + command.eraseTrackingLogFromMemory(517975, 0)) ;