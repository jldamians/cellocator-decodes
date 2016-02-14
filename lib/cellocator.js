var Util = require('./lib/util') ;
var util = new Util() ;

module.exports = cellocator;

function Cellocator(trama, ip, port){
    this.trama = trama || '' ;
    this.port  = port || '' ;
    this.ip    = ip || '' ;
}

Cellocator.prototype.systemCode = function() {
    var returned     = '' ;
    var byteFrom1To4 = '' ;

    byteFrom1To4 = this.trama.substr(0, 8) ;

    if ( byteFrom1To4 ) {
        returned = util.hexToAscii(byteFrom1To4) ;
    }

    return returned ;
}

Cellocator.prototype.messageType = function() {
    var returned = 0 ;
    var byte5 = '' ;

    byte5 = _trama.substr(8, 2) ;

    if ( byte5 ) {
        returned = util.hexToDec(byte5) ;
    }

    return returned ;
}

Cellocator.prototype.unitsId = function() {
    var returned     = '' ;
    var byteFrom6To9 = '' ;

    byteFrom6To9 = this.trama.substr(10, 8) ;

    if ( byteFrom6To9 ) {
        returned = util.reverseHexadecimal(byteFrom6To9) ;
        returned = util.hexToDec(returned) ;
    }

    return returned ;
}

Cellocator.prototype.communicationControlField = function() {
    var bytefrom10to11 = '' ;
    var byte10         = '' ;
    var byte11         = '' ;

    bytefrom10to11 = this.trama.substr(18, 4) ;
    byte11 = util.hexToBin(bytefrom10to11.substr(0, 2)) ;
    byte10 = util.hexToBin(bytefrom10to11.substr(2, 2)) ;

    return {
        activeTransmission: function() {
            // LSB => Bit Menos Significativo
            return byte10.substr(-1);
        },
        garminDisabled: function() {
            return byte10.substr(0, 1) ;
        },
        garminNotConnected: function() {
            return byte10.substr(1, 1) ;
        },
        directFromRam: function() {
            return byte10.substr(2, 1) ;
        },
        pspModeIsEnabled: function() {
            return byte10.substr(3, 2) ;
        },
        notCanOriginatedSpeed: function() {
            return byte10.substr(5, 1) ;
        },
        notCanOriginatedOdometer: function() {
            // MSB => Bit Mas Significativo
            return byte10.substr(0, 1) ;
        },
        noHibernation: function() {
            // MSB => Bit Mas Significativo
            return byte11.substr(0, 1) ;
        },
        momentarySpeed: function() {
            return byte11.substr(1, 1) ;
        },
        h: function() {
            return byte11.substr(3, 5) ;
        }
    }
}

Cellocator.prototype.messageNumerator = function() {
    var returned = '' ;
    var byte12   = '' ;

    byte12 = this.trama.substr(22, 2) ;

    if ( byte12 ) {
        returned = util.hexToDec(byte12) ;
    }

    return returned ;
}

Cellocator.prototype.unitsHardwareVersion = function() {
    var byte13   = '' ;

    byte13 = this.trama.substr(24, 2) ;
    byte13 = util.hexToBin(byte13) ;

    return {
        modem: function() {
            return utin.binToDec(byte13.substr(0, 3)) ;
        },
        modelo: function() {
            return utin.binToHex(byte13.substr(3, 5)) ;
        }
    }
}

Cellocator.prototype.unitsSoftwareVersion = function() {
    var returned = '' ;
    var byte14   = '' ;

    byte14 = this.trama.substr(26, 2) ;

    if ( byte14 ) {
        returned = util.hexToDec(byte14) ;
    }

    return returned ;
}

Cellocator.prototype.protocolVersionIdentifier = function() {
    var returned = '' ;
    var byte15   = '' ;

    byte15 = this.trama.substr(28, 2) ;

    if ( byte15 ) {
        returned = util.hexToDec(byte15) ;
    }

    return returned ;
}

Cellocator.prototype.unitsStatusCurrentGsmOperator = function() {
    var returned    = '' ;
    var byte16      = '' ;
    var unitsstatus = '' ;
    var 1stnibble   = '' ;

    byte16      = this.trama.substr(30, 2) ;

    unitsstatus = byte16.substr(-1) ;
    1stnibble   = byte16.substr(0, 1) ;

    unitsstatus = util.hexToBin(unitsstatus) ;

    return {
        speedEstimatedByGps: function() {
            // MSB => Bit Mas Significativo
            return unitsstatus.substr(0, 1) ;
        },
        correctTime: function() {
            return unitsstatus.substr(1, 1) ;
        },
        homeNetwork: function() {
            return unitsstatus.substr(2, 1) ;
        },
        gpsCommunicationAvailable: function() {
            // LSB => Bit Menos Significativo
            return unitsstatus.substr(-1) ;
        },
        currentGsmOperator1stNibble: function() {
            return 1stnibble ;
        }
    }
}

Cellocator.prototype.currentGsmOperator = function() {
    var 2nd3rdnibble = '' ;
    var byte17   = '' ;

    byte17 = this.trama.substr(32, 2) ;

    if ( byte17 ) {
        2nd3rdnibble = byte17 ;
    }

    return 2nd3rdnibble ;
}

Cellocator.prototype.transmissionReasonSpecificData = function() {
    var returned = '' ;
    var byte18   = '' ;

    byte18 = this.trama.substr(34, 2) ;

    if ( byte18 ) {
        returned = util.hexToDec(byte18) ;
    }

    return returned ;   
}

Cellocator.prototype.transmissionReason = function() {
    var returned = '' ;
    var byte19   = '' ;

    byte19 = this.trama.substr(36, 2) ;

    if ( byte19 ) {
        returned = util.hexToDec(byte19) ;
    }

    return returned ;  
}

Cellocator.prototype.unitsModeOfOperation = function() {
    var returned = '' ;
    var byte20   = '' ;

    byte20 = this.trama.substr(38, 2) ;

    if ( byte20 ) {
        returned = byte20 ;
    }

    return returned ;
}

Cellocator.prototype.unitsInputOutputStatus1stByte = function() {
    var byte21   = '' ;

    byte21 = this.trama.substr(40, 2) ;
    byte21 = util.hexToBin(byte21) ;

    return {
        unlockInactive: function() {
            // MSB => Bit Mas Significativo
            return byte21.substr(0, 1) ;
        },
        panicInactive: function() {
            return byte21.substr(1, 1) ;
        },
        drivingStatus: function() {
            return byte21.substr(2, 1) ;
        },
        shockInactive: function() {
            return byte21.substr(6, 1) ;
        },
        doorInactive: function() {
            // LSB => Bit Menos Significativo
            return byte21.substr(-1) ;
        }
    }
}

Cellocator.prototype.unitsInputOutputStatus2stByte = function() {
    var byte22   = '' ;

    byte22 = this.trama.substr(42, 2) ;
    byte22 = util.hexToBin(byte22) ;

    return {
        ignitionPortStatus: function() {
            // MSB => Bit Mas Significativo
            return byte22.substr(0, 1) ;
        },
        accelerometerStatus: function() {
            return byte22.substr(1, 1) ;
        }
    }
}

Cellocator.prototype.unitsInputOutputStatus3stByte = function() {
    var byte23   = '' ;

    byte23 = this.trama.substr(44, 2) ;
    byte23 = util.hexToBin(byte23) ;

    return {
        gpsPower: function() {
            return byte23.substr(4, 1) ;
        },
        gradualStopInactive: function() {
            return byte23.substr(5, 1) ;
        },
        sirenInactive: function() {
            return byte23.substr(6, 1) ;
        }
    }
}

Cellocator.prototype.unitsInputOutputStatus4stByte = function() {
    var bytefrom24to25 = '' ;
    var byte24         = '' ;
    var byte25         = '' ;

    bytefrom24to25 = this.trama.substr(46, 4) ;

    byte24 = util.hexToBin(bytefrom24to25.substr(0, 2)) ;
    byte25 = util.hexToBin(bytefrom24to25.substr(2, 2)) ;

    return {
        notCharging: function() {
            // MSB => Bit Mas Significativo
            return byte24.substr(0, 1) ;
        },
        standardImmobilizer: function() {
            return byte24.substr(2, 1) ;
        },
        globalOutput: function() {
            return byte24.substr(4, 1) ;
        },
        ledInactive: function() {
            // LSB => Bit Menos Significativo
            return byte24.substr(-1) ;
        },
        plmn: function() {
            return this.unitsStatusCurrentGsmOperator().currentGsmOperator1stNibble()+''+this.currentGsmOperator()+''+byte25 ;
        }
    }
}

Cellocator.prototype.analogInput1value = function() {
    var returned = '' ;
    var byte26   = '' ;

    byte26 = this.trama.substr(50, 2) ;

    if ( byte26 ) {
        returned = util.hexToDec(byte26) ;
        returned = returned * 0.1176470588235 ;
    }

    return returned ;
}

Cellocator.prototype.analogInput2value = function() {
    var returned = '' ;
    var byte27   = '' ;

    byte27 = this.trama.substr(52, 2) ;

    if ( byte27 ) {
        returned = util.hexToDec(byte27) ;
        returned = returned * 0.01647058823 ;
    }

    return returned ;   
}

Cellocator.prototype.analogInput3value = function() {
    var returned = '' ;
    var byte28   = '' ;

    byte28 = this.trama.substr(54, 2) ;

    if ( byte28 ) {
        returned = util.hexToDec(byte28) ;
        returned = (returned * 0.4314) - 40 ;
    }

    return returned ;
}

Cellocator.prototype.analogInput4value = function() {
    var returned = '' ;
    var byte29   = '' ;

    byte29 = this.trama.substr(56, 2) ;

    if ( byte29 ) {
        returned = util.hexToDec(byte29) ;
    }

    return returned ;
}

Cellocator.prototype.mileageCounter = function() {
    var returned       = '' ;
    var bytefrom30to32 = '' ;

    bytefrom30to32 = this.trama.substr(58, 6) ;

    if ( bytefrom30to32 ) {
        returned = util.reverseHexadecimal(bytefrom30to32) ;
        returned = util.hexToDec(returned) ;
    }

    return returned ;   
}

Cellocator.prototype.multiPurposeField = function() {
    var returned       = '' ;
    var bytefrom33to38 = '' ;

    bytefrom33to38 = this.trama.substr(64, 12) ;

    if ( bytefrom33to38 ) {
        returned = util.reverseHexadecimal(bytefrom33to38) ;
    }

    return returned ;   
}

Cellocator.prototype.lastGpsFix = function() {
    var returned       = '' ;
    var bytefrom39to40 = '' ;

    bytefrom39to40 = this.trama.substr(76, 4) ;
    bytefrom39to40 = util.reverseHexadecimal(bytefrom39to40) ;
    bytefrom39to40 = util.hexToBin(bytefrom39to40) ;

    return {
        dayOfMonth: function() {
            return util.hexToDec(bytefrom39to40.substr(0, 5)) ;
        },
        hours: function() {
            return util.hexToDec(bytefrom39to40.substr(5, 5)) ;
        },
        minutes: function() {
            return util.hexToDec(bytefrom39to40.substr(10, 6)) ;
        }
    }
}

Cellocator.prototype.locationStatus = function() {
    var fromunit = '' ;
    var byte41   = '' ;

    byte41 = this.trama.substr(80, 2) ;

    if ( byte41 ) {
        fromunit = util.hexToBin(byte41) ;
    }

    return fromunit ; 
}

Cellocator.prototype.mode1 = function() {
    var fromgps = '' ;
    var byte42   = '' ;

    byte42 = this.trama.substr(82, 2) ;

    if ( byte42 ) {
        fromgps = util.hexToBin(byte42) ;
    }

    return fromgps ; 
}

Cellocator.prototype.mode2 = function() {
    var fromgps = '' ;
    var byte43   = '' ;

    byte43 = this.trama.substr(84, 2) ;

    if ( byte43 ) {
        fromgps = util.hexToBin(byte43) ;
    }

    return fromgps ; 
}

Cellocator.prototype.numberOfSatellitesUsed = function() {
    var fromgps = '' ;
    var byte44   = '' ;

    byte44 = this.trama.substr(86, 2) ;

    if ( byte44 ) {
        fromgps = util.hexToDec(byte44) ;
    }

    return fromgps ;    
}

Cellocator.prototype.longitudeAndLatitude = function() {
    var returned       = '' ;
    var bytefrom45to52 = '' ;

    bytefrom45to52 = this.trama.substr(88, 16) ;

    return {
        latitude: function() {
            var gpsx = bytefrom45to52.substr(8, 8) ;
            var lat = 0 ;

            if ( gpsx ) {
                gpsx = util.reverseHexadecimal(gpsx) ;

                if ( gpsx.substr(0, 1) === 'F' ) {
                    lat = util.hexToBin(gpsx) ;
                    lat = util.notBinary(lat) ;
                    lat = util.binToDec(lat);
                    lat = (lat + 1) * -1 ;
                }
                else {
                    lat = util.hexToDec(gpsx) ;
                }

                lat = lat * (180 / Math.PI) * Math.pow(10, -8) ;
            }

            return lat ;
        },
        longitude: function() {
            var gpsy = bytefrom45to52.substr(0, 8) ;
            var lng  = 0 ;

            if ( gpsy ) {
                gpsy = util.reverseHexadecimal(gpsy) ;

                if ( gpsy.substr(0, 1) === 'F' ) {
                    lng = util.hexToBin(gpsy) ;
                    lng = util.notBinary(lng) ;
                    lng = util.binToDec(lng) ;
                    lng = (lng + 1) * -1 * (180 / Math.PI) * Math.pow(10, -8) ;
                }
                else {
                    lng = util.hexToDec(gpsy) ;
                    lng = lng * (180 / Math.PI) * Math.pow(10, -9) ;
                }
            }

            return lng ;
        }
    }
}

Cellocator.prototype.altitude = function() {
    var returned       = '' ;
    var bytefrom53to56 = '' ;

    bytefrom53to56 = this.trama.substr(104, 8) ;

    if ( bytefrom53to56 ) {
        returned = util.reverseHexadecimal(bytefrom53to56) ;
        returned = util.hexToDec(returned) ;
        returned = returned * 0.01 ;
    }

    return returned ;  
}

Cellocator.prototype.groundSpeed = function() {
    var returned       = '' ;
    var bytefrom57to60 = '' ;

    bytefrom57to60 = this.trama.substr(112, 8) ;

    if ( bytefrom57to60 ) {
        returned = util.reverseHexadecimal(bytefrom57to60) ;
        returned = util.hexToDec(returned) ;
        returned = returned * 0.036 ;
    }

    return returned ; 
}

Cellocator.prototype.speedDirection = function() {
    var returned       = '' ;
    var bytefrom61to62 = '' ;

    bytefrom61to62 = this.trama.substr(120, 4) ;

    if ( bytefrom61to62 ) {
        returned = util.reverseHexadecimal(bytefrom61to62) ;
        returned = util.hexToDec(returned) ;
        returned = returned * (180 / Math.PI) * 0.001 ;
    }

    return returned ; 
}

Cellocator.prototype.utcTimeSeconds = function() {
    var returned = '' ;
    var byte63   = '' ;

    byte63 = this.trama.substr(124, 2) ;

    if ( byte63 ) {
        returned = util.hexToDec(byte63) ;
    }

    return returned ; 
}

Cellocator.prototype.utcTimeMinutes = function() {
    var returned = '' ;
    var byte64   = '' ;

    byte64 = this.trama.substr(126, 2) ;

    if ( byte64 ) {
        returned = util.hexToDec(byte64) ;
    }

    return returned ;    
}

Cellocator.prototype.utcTimeHours = function() {
    var returned = '' ;
    var byte65   = '' ;

    byte65 = this.trama.substr(128, 2) ;

    if ( byte65 ) {
        returned = util.hexToDec(byte65) ;
    }

    return returned ; 
}

Cellocator.prototype.utcTimeDay = function() {
    var returned = '' ;
    var byte66   = '' ;

    byte66 = this.trama.substr(130, 2) ;

    if ( byte66 ) {
        returned = util.hexToDec(byte66) ;
    }

    return returned ; 
}

Cellocator.prototype.utcTimeMonth = function() {
    var returned = '' ;
    var byte67   = '' ;

    byte67 = this.trama.substr(132, 2) ;

    if ( byte67 ) {
        returned = util.hexToDec(byte67) ;
    }

    return returned ; 
}

Cellocator.prototype.utcTimeYear = function() {
    var returned       = '' ;
    var bytefrom68to69 = '' ;

    bytefrom68to69 = this.trama.substr(134, 4) ;

    if ( bytefrom68to69 ) {
        returned = util.reverseHexadecimal(bytefrom68to69) ;
        returned = util.hexToDec(returned) ;
    }

    return returned ;   
}

Cellocator.prototype.errorDetectionCode = function() {
    var returned = '' ;
    var byte70   = '' ;

    byte70        = this.trama.substr(138, 2) ;
    bytefrom4to69 = this.trama.substr(8, 130) ;

    return {
        code: function() {
            return byte70 ;
        },
        checksum: function() {
            var detection = util.checksum(bytefrom4to69) ;
            if ( byte70 === detection ) {
                error = true ;
            }

            return false ;
        }
    }
}