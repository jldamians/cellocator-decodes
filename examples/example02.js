'use strict';

var Command = require('../index.js').commands;
var generic = new Command.generic();
  
console.log(generic.reset('ABCDEF', 'FE'));
console.log(generic.status('ABCDEF', 'AB'));
console.log(generic.activateImmobilizer('ABCDEF', 'AB'));