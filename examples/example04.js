'use strict';

var tramaGPS = require('../lib/utils/handleTrama');

var errorDetectionCode = tramaGPS.checksum('0157E707000000000000043C0000006316A13B0500E803040402000000');

console.log(errorDetectionCode);
