'use strict';

var Ack = require('../index.js').commands.Ack;

var ack = new Ack(219999, 100, 120);

console.log(ack.getCommand());
