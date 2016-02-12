/*var ConvertBase = require('convert-base') ;

var converter = new ConvertBase();

var bin1 = converter.convert('4D434750', 16, 10); // 10000 
var bin2 = converter.convert(171, 10, 16); // 1111 

console.log(bin1) ;
console.log(bin2) ;*/


var Util = require('./lib/util') ;

var util         = new Util() ;

var result = util.notBinary('1000001110') ;

console.log(result);