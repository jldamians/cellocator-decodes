var Util = require('./lib/util');

var util = new Util() ;
var trama = '00856308000004B2DE1F04009E00200100000000696CF7AB002F1A00000000000000325C000402069BFDE70857E22502F41C000036000000DF0B0932100B09DC07';
console.log(util.checksum(trama)) ;
/*var checksum = 0 ;
['00','85','63','08','00','00','04','B2','DE','1F','04','00','9E','00','20','01','00','00','00','00','69','6C','F7','AB','00','2F','1A','00','00','00','00','00','00','00','32','5C','00','04','02','06','9B','FD','E7','08','57','E2','25','02','F4','1C','00','00','36','00','00','00','DF','0B','09','32','10','0B','09','DC','07'].forEach(function(element){
	checksum += parseInt(element, 16) ;
});
checksum = parseInt(checksum, 10).toString(16) ;
console.log(checksum);*/