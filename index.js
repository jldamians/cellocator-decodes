'use strict';


	var commands = require('./lib/commands').Commands ;

	console.log('reset => ' + commands.reset(517975, 0)) ;

	console.log('activateImmobilizer => ' + commands.activateImmobilizer(517975, 118)) ;

	console.log('eraseTrackingLogFromMemory=> ' + commands.eraseTrackingLogFromMemory(517975, 0)) ;

	var example01 = commands.genericAcknowledgeMessage(575873, 20, 22);

	console.log(example01);


/*
	var Cellocator = require('./lib/cellocator.js').Cellocator;

	var trama = '4d43475000bdda0b0000060ddf20041017002000e3c40000baeff3c6b6224502000000000000ea65000402090daec5f7cb302cff3357000038090000930a002a170c03e007c1';

	var celo = new Cellocator(trama);

	console.log(celo.database());
*/