'use strict';

/*
	var command = require('./lib/commands') ;

	console.log('reset => ' + command.reset(517975, 0)) ;

	console.log('activateImmobilizer => ' + command.activateImmobilizer(517975, 118)) ;

	console.log('eraseTrackingLogFromMemory=> ' + command.eraseTrackingLogFromMemory(517975, 0)) ;

	var example01 = command.genericAcknowledgeMessage(575873, 20, 22);

	console.log(example01);
*/

var Cellocator = require('./lib/cellocator.js').Cellocator;

var trama = '4d434750002168050000069ab61c041017002000e3040100bad42cb700925c03000000000000d9ed000402098227f6f7314860ff354901000000000032080119171d02e007c8';

var celo = new Cellocator(trama);
console.log(celo.database());

/*var objTrama = celo.database();

console.log(objTrama);*/
