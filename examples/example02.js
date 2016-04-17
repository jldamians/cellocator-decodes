'use strict';

var Generic = require('../index.js').commands.generic;
  
console.log(Generic.reset('ABCDEF', 'FE'));
console.log(Generic.status('ABCDEF', 'AB'));
console.log(Generic.activateImmobilizer('ABCDEF', 'AB'));