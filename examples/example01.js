'use strict';

var decode = require('../index.js').decode;
var trama = '4d43475000d52c090000081cd81f041017002001c3040820bacacab3b67a050000000000000087bc00040209c25bb3f777f84dfffa1500000000000000000e03131704e0079f';
var cello = decode(trama, '127.0.0.1', '3000');

console.log(cello.database());
