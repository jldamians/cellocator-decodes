'use strict';

var command = require('./lib/commands') ;


	console.log('reset => ' + command.reset(517975, 0)) ;
	// Result => 

	console.log('activateImmobilizer => ' + command.activateImmobilizer(517975, 118)) ;
	// Result => 

	console.log('eraseTrackingLogFromMemory=> ' + command.eraseTrackingLogFromMemory(517975, 0)) ;
	// Result => 	



	var example01 = command.genericAcknowledgeMessage(575873, 20, 22);

	console.log(example01);

	// Result => 