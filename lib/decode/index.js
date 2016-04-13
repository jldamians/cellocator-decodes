var date = require('../utils/handleDate');
var base = require('../utils/convertBase');
var tramaGps = require('../utils/handleTrama');
var helper = require('../helpers/');
var HARDWARE = require('../constants/').hardwareCodes;
var CUSTOM_DATE = require('../constants/').customDate;
var TIME_KEY = require('../constants/').timeKey;

function Decode (trama, ip, port){
    this.trama = trama || '' ;
    this.port = port || '3000' ;
    this.ip = ip || '127.0.0.1' ;

    // get current date
    this.now = date.now();
}

(function() {
    this.database = function() {
        var _rmuid = base.hexToDec(this.unitsId());
        var _utctime = this.utcTimeYear()+'-'+this.utcTimeMonth()+'-'+this.utcTimeDay()+' '+this.utcTimeHours()+':'+this.utcTimeMinutes()+':'+this.utcTimeSeconds();
            _utctime = date.fromText(_utctime, CUSTOM_DATE.dateTimeFormat);
            _utctime = date.toFormat(_utctime, CUSTOM_DATE.dateTimeFormat);
        var _celldatetime = date.fromText(_utctime, CUSTOM_DATE.dateTimeFormat);
            _celldatetime = date.subtract(_celldatetime, CUSTOM_DATE.greenwich, TIME_KEY.h);
            _celldatetime = date.toFormat(_celldatetime, CUSTOM_DATE.dateTimeFormat);
        var _gpsx = this.longitudeAndLatitude().latitude(); 
        var _gpsy = this.longitudeAndLatitude().longitude(); 
        var _insertdate = this.now;
            _insertdate = date.toFormat(_insertdate, CUSTOM_DATE.dateTimeFormat);
        var _gpsdatetime = helper.lpad(this.now.year(), 2)+'-'+helper.lpad(this.now.month(), 2)+'-'+this.lastGpsFix().dayOfMonth()+' '+this.lastGpsFix().hours()+':'+this.lastGpsFix().minutes()+':'+this.utcTimeSeconds();
            _gpsdatetime = date.fromText(_gpsdatetime, CUSTOM_DATE.dateTimeFormat); 
            _gpsdatetime = date.toFormat(_gpsdatetime, CUSTOM_DATE.dateTimeFormat);
        var _speed = this.groundSpeed(); 
        var _direction = this.speedDirection(); 
        var _numofsat = this.numberOfSatellitesUsed();
        var _locquality = -1; 
        var _engineon = base.hexToDec(this.unitsModeOfOperation()); 
        var _extinputa = base.binToDec(this.unitsInputOutputStatus2stByte().lock()); 
        var _extinputb = base.binToDec(this.unitsInputOutputStatus1stByte().unlockInactive()); 
        var _extinputc = base.binToDec(this.unitsInputOutputStatus2stByte().ignitionPortStatus());
        var _extinputd = base.binToDec(this.unitsInputOutputStatus1stByte().doorInactive());
        var _extinpute = base.binToDec(this.unitsInputOutputStatus1stByte().shockInactive());
        var _extinputf = base.binToDec(this.unitsInputOutputStatus1stByte().panicInactive());
        var _versionnum = 'HW: <'+this.unitsHardwareVersion().version()+'>, SW: <'+this.unitsSoftwareVersion()+'>'; 
        var _ip = this.ip;
        var _inputvoltage = this.analogInput1value(); 
        var _backbatvoltage = this.analogInput2value();
        var _gpspdop = -1;
        var _gpsheight = this.altitude();
        var _networktypeid = -1;
        var _driverid = -1;
        var _txreasonid = this.transmissionReason();
        var _alertreason = -1;
        var _hibernation = base.binToDec(this.communicationControlField().noHibernation());
        var _hrnetwork = -1;
        var _milecounter = this.mileageCounter(); 
        var _gpsmode1 = base.binToDec(this.mode1());
        var _gpsmode2 = base.binToDec(this.mode2());
        var _outputa = base.binToDec(this.unitsInputOutputStatus3stByte().gradualStopInactive());
        var _outputb = -1;
        var _outputc = base.binToDec(this.unitsInputOutputStatus4stByte().standardImmobilizer());
        var _outputd = base.binToDec(this.unitsInputOutputStatus3stByte().sirenInactive()); 
        var _optionalinput = -1;
        var _gpscommstatus = -1;
        var _rawdata = this.trama;
        var _plmn = this.unitsInputOutputStatus4stByte().plmn(); 
        var _sn = this.messageNumerator(); 
        var _messagetype = this.messageType();
        var _msgprotocol = -1; 
        var _tripid = -1;
        var _maneuverid = -1;
        var _manueverusage = -1;
        var _accidentbuffer = -1;
        var _itemid = -1; 

        return {
            RMUId: _rmuid, // Integer
            CellDateTime: _celldatetime, // DateTime
            GPSX: _gpsx, // Integer
            GPSY: _gpsy, // Integer
            GPSDateTime: _gpsdatetime, // DateTime
            Speed: _speed, // Integer
            Direction: _direction, // Integer
            NumOfSat: _numofsat, // Integer
            LocQuality: _locquality, // Integer
            EngineOn: _engineon, // Integer
            ExtInputA: _extinputa, // Integer
            ExtInputB: _extinputb, // Integer
            ExtInputC: _extinputc, // Integer
            ExtInputD: _extinputd, // Integer
            ExtInputE: _extinpute, // Integer
            ExtInputF: _extinputf, // Integer
            VersionNum: _versionnum, // Varchar(25)
            IP: _ip, // Char(15)
            InputVoltage: _inputvoltage, // Integer
            BackBatVoltage: _backbatvoltage, // Integer
            GPSPDOP: _gpspdop, // Small Integer(2 bytes)
            GPSHEIGHT: _gpsheight, // Integer
            NetworkTypeId: _networktypeid, // Small Integer(2 bytes)/**/
            InsertDate: _insertdate, // DateTime
            UTCTime: _utctime, // DateTime
            DriverId: _driverid, // Long(8 bytes)
            TxReasonId: _txreasonid, // Integer
            AlertReason: _alertreason, // Integer
            Hibernation: _hibernation, // Integer
            HRNetwork: _hrnetwork, // Integer
            MileCounter: _milecounter, // Integer
            GPSMode1: _gpsmode1, // Integer
            GPSMode2: _gpsmode2, // Integer
            OutputA: _outputa, // Integer
            OutputB: _outputb, // Integer
            OutputC: _outputc, // Integer
            OutputD: _outputd, // Integer
            OptionalInput: _optionalinput, // Integer
            GPSCommStatus: _gpscommstatus, // Integer
            RawData: _rawdata, // Varchar(2000)
            PLMN: _plmn, // Integer
            SN: _sn, // Integer
            MessageType: _messagetype, // Integer
            MsgProtocol: _msgprotocol, // Small Integer(2 bytes)
            TripId: _tripid, // Integer
            ManeuverId: _maneuverid, // Integer
            ManeuverUsage: _manueverusage, // Small Integer(2 bytes)
            AccidentBuffer: _accidentbuffer, // Small Integer(2 bytes)
            ItemId: _itemid // Long
        }
    }

    this.systemCode = function() {
        var returned     = '' ;
        var byteFrom1To4 = '' ;

        byteFrom1To4 = this.trama.substr(0, 8) ;

        if ( byteFrom1To4 ) {
            returned = base.hexToAscii(byteFrom1To4) ;
        }

        return returned ;
    }

    this.messageType = function() {
        var returned = 0 ;
        var byte5 = '' ;

        byte5 = this.trama.substr(8, 2) ;

        if ( byte5 ) {
            returned = base.hexToDec(byte5) ;
        }

        return returned ;
    }

    this.unitsId = function() {
        var returned     = '' ;
        var byteFrom6To9 = '' ;

        byteFrom6To9 = this.trama.substr(10, 8) ;

        if ( byteFrom6To9 ) {
            returned = base.reverseHexadecimal(byteFrom6To9) ;
            returned = base.hexToDec(returned) ;
        }

        return returned ;
    }

    this.communicationControlField = function() {
        var bytefrom10to11 = '' ;
        var byte10         = '' ;
        var byte11         = '' ;

        bytefrom10to11 = this.trama.substr(18, 4) ;
        byte11 = base.hexToBin(bytefrom10to11.substr(0, 2)) ;
        byte10 = base.hexToBin(bytefrom10to11.substr(2, 2)) ;

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

    this.messageNumerator = function() {
        var returned = '' ;
        var byte12   = '' ;

        byte12 = this.trama.substr(22, 2) ;

        if ( byte12 ) {
            returned = base.hexToDec(byte12) ;
        }

        return returned ;
    }

    this.unitsHardwareVersion = function() {
        var byte13   = '' ;
        var _modem   = '' ;
        var _modelo  = '' ;
        var _version = '' ;

        byte13 = this.trama.substr(24, 2) ;
        byte13 = base.hexToBin(byte13) ;

        _modem  = base.binToDec(byte13.substr(0, 3)) ;
        _modelo = base.binToDec(byte13.substr(3, 5)) ;

        for (property in HARDWARE){
            if ( property.modeloid === _modelo && property.modemcode === _modem ) {
                _version = property ;
            }
        }

        return {
            modem: function() {
                return _modem ;
            },
            modelo: function() {
                return _modelo ;
            },
            version: function() {
                return _version ;
            }
        }
    }

    this.unitsSoftwareVersion = function() {
        var returned = '' ;
        var byte14   = '' ;

        byte14 = this.trama.substr(26, 2) ;

        if ( byte14 ) {
            returned = base.hexToDec(byte14) ;
        }

        return returned ;
    }

    this.protocolVersionIdentifier = function() {
        var returned = '' ;
        var byte15   = '' ;

        byte15 = this.trama.substr(28, 2) ;

        if ( byte15 ) {
            returned = base.hexToDec(byte15) ;
        }

        return returned ;
    }

    this.unitsStatusCurrentGsmOperator = function() {
        var returned    = '' ;
        var byte16      = '' ;
        var unitsstatus = '' ;
        var firstnibble   = '' ;

        byte16      = this.trama.substr(30, 2) ;

        unitsstatus = byte16.substr(-1) ;
        firstnibble   = byte16.substr(0, 1) ;

        unitsstatus = base.hexToBin(unitsstatus) ;

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
                return firstnibble ;
            }
        }
    }

    this.currentGsmOperator = function() {
        var secondthirdnibble = '' ;
        var byte17   = '' ;

        byte17 = this.trama.substr(32, 2) ;

        if ( byte17 ) {
            secondthirdnibble = byte17 ;
        }

        return secondthirdnibble ;
    }

    this.transmissionReasonSpecificData = function() {
        var returned = '' ;
        var byte18   = '' ;

        byte18 = this.trama.substr(34, 2) ;

        if ( byte18 ) {
            returned = base.hexToDec(byte18) ;
        }

        return returned ;   
    }

    this.transmissionReason = function() {
        var returned = '' ;
        var byte19   = '' ;

        byte19 = this.trama.substr(36, 2) ;

        if ( byte19 ) {
            returned = base.hexToDec(byte19) ;
        }

        return returned ;  
    }

    this.unitsModeOfOperation = function() {
        var returned = '' ;
        var byte20   = '' ;

        byte20 = this.trama.substr(38, 2) ;

        if ( byte20 ) {
            returned = byte20 ;
        }

        return returned ;
    }

    this.unitsInputOutputStatus1stByte = function() {
        var byte21   = '' ;

        byte21 = this.trama.substr(40, 2) ;
        byte21 = base.hexToBin(byte21) ;

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

    this.unitsInputOutputStatus2stByte = function() {
        var byte22   = '' ;

        byte22 = this.trama.substr(42, 2) ;
        byte22 = base.hexToBin(byte22) ;

        return {
            ignitionPortStatus: function() {
                // MSB => Bit Mas Significativo
                return byte22.substr(0, 1) ;
            },
            accelerometerStatus: function() {
                return byte22.substr(1, 1) ;
            },
            lock: function() {
                return byte22.substr(5, 1) ;
            }
        }
    }

    this.unitsInputOutputStatus3stByte = function() {
        var byte23   = '' ;

        byte23 = this.trama.substr(44, 2) ;
        byte23 = base.hexToBin(byte23) ;

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

    this.unitsInputOutputStatus4stByte = function() {
        var self = this ;
        var bytefrom24to25 = '' ;
        var byte24         = '' ;
        var byte25         = '' ;

        bytefrom24to25 = self.trama.substr(46, 4) ;

        byte24 = base.hexToBin(bytefrom24to25.substr(0, 2)) ;
        byte25 = base.hexToBin(bytefrom24to25.substr(2, 2)) ;

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
                return base.hexToDec(self.unitsStatusCurrentGsmOperator().currentGsmOperator1stNibble()+''+self.currentGsmOperator()+''+byte25) ;
            }
        }
    }

    this.analogInput1value = function() {
        var returned = '' ;
        var byte26   = '' ;

        byte26 = this.trama.substr(50, 2) ;

        if ( byte26 ) {
            returned = base.hexToDec(byte26) ;
            returned = returned * 0.1176470588235 ;
        }

        return returned ;
    }

    this.analogInput2value = function() {
        var returned = '' ;
        var byte27   = '' ;

        byte27 = this.trama.substr(52, 2) ;

        if ( byte27 ) {
            returned = base.hexToDec(byte27) ;
            returned = returned * 0.01647058823 ;
        }

        return returned ;   
    }

    this.analogInput3value = function() {
        var returned = '' ;
        var byte28   = '' ;

        byte28 = this.trama.substr(54, 2) ;

        if ( byte28 ) {
            returned = base.hexToDec(byte28) ;
            returned = (returned * 0.4314) - 40 ;
        }

        return returned ;
    }

    this.analogInput4value = function() {
        var returned = '' ;
        var byte29   = '' ;

        byte29 = this.trama.substr(56, 2) ;

        if ( byte29 ) {
            returned = base.hexToDec(byte29) ;
        }

        return returned ;
    }

    this.mileageCounter = function() {
        var returned       = '' ;
        var bytefrom30to32 = '' ;

        bytefrom30to32 = this.trama.substr(58, 6) ;

        if ( bytefrom30to32 ) {
            returned = base.reverseHexadecimal(bytefrom30to32) ;
            returned = base.hexToDec(returned) ;
        }

        return returned ;   
    }

    this.multiPurposeField = function() {
        var returned       = '' ;
        var bytefrom33to38 = '' ;

        bytefrom33to38 = this.trama.substr(64, 12) ;

        if ( bytefrom33to38 ) {
            returned = base.reverseHexadecimal(bytefrom33to38) ;
        }

        return returned ;   
    }

    this.lastGpsFix = function() {
        var bytefrom39to40 = '' ;

        bytefrom39to40 = this.trama.substr(76, 4) ;
        bytefrom39to40 = base.reverseHexadecimal(bytefrom39to40) ;
        bytefrom39to40 = base.hexToBin(bytefrom39to40) ;

        return {
            dayOfMonth: function() {
                var returned = '00' + base.binToDec(bytefrom39to40.substr(0, 5));
                return returned.substr(-2);
            },
            hours: function() {
                var returned = '00' + base.binToDec(bytefrom39to40.substr(5, 5));
                return returned.substr(-2);
            },
            minutes: function() {
                var returned = '00' + base.binToDec(bytefrom39to40.substr(10, 6)) ;
                return returned.substr(-2);
            }
        }
    }

    this.locationStatus = function() {
        var fromunit = '' ;
        var byte41   = '' ;

        byte41 = this.trama.substr(80, 2) ;

        if ( byte41 ) {
            fromunit = base.hexToBin(byte41) ;
        }

        return fromunit ; 
    }

    this.mode1 = function() {
        var fromgps = '' ;
        var byte42   = '' ;

        byte42 = this.trama.substr(82, 2) ;

        if ( byte42 ) {
            fromgps = base.hexToBin(byte42) ;
        }

        return fromgps ; 
    }

    this.mode2 = function() {
        var fromgps = '' ;
        var byte43   = '' ;

        byte43 = this.trama.substr(84, 2) ;

        if ( byte43 ) {
            fromgps = base.hexToBin(byte43) ;
        }

        return fromgps ; 
    }

    this.numberOfSatellitesUsed = function() {
        var fromgps = '' ;
        var byte44   = '' ;

        byte44 = this.trama.substr(86, 2) ;

        if ( byte44 ) {
            fromgps = base.hexToDec(byte44) ;
        }

        return fromgps ;    
    }

    this.longitudeAndLatitude = function() {
        var returned       = '' ;
        var bytefrom45to52 = '' ;

        bytefrom45to52 = this.trama.substr(88, 16) ;

        return {
            latitude: function() {
                var gpsx = bytefrom45to52.substr(8, 8) ;
                var lat = 0 ;

                if ( gpsx ) {
                    gpsx = base.reverseHexadecimal(gpsx) ;

                    if ( gpsx.substr(0, 1) === 'F' ) {
                        lat = base.hexToBin(gpsx) ;
                        lat = base.notBinary(lat) ;
                        lat = base.binToDec(lat);
                        lat = (lat + 1) * -1 ;
                    }
                    else {
                        lat = base.hexToDec(gpsx) ;
                    }

                    lat = lat * (180 / Math.PI) * Math.pow(10, -8) ;
                }

                return lat ;
            },
            longitude: function() {
                var gpsy = bytefrom45to52.substr(0, 8) ;
                var lng  = 0 ;

                if ( gpsy ) {
                    gpsy = base.reverseHexadecimal(gpsy) ;

                    if ( gpsy.substr(0, 1) === 'F' ) {
                        lng = base.hexToBin(gpsy) ;
                        lng = base.notBinary(lng) ;
                        lng = base.binToDec(lng) ;
                        lng = (lng + 1) * -1 * (180 / Math.PI) * Math.pow(10, -8) ;
                    }
                    else {
                        lng = base.hexToDec(gpsy) ;
                        lng = lng * (180 / Math.PI) * Math.pow(10, -9) ;
                    }
                }

                return lng ;
            }
        }
    }

    this.altitude = function() {
        var returned       = '' ;
        var bytefrom53to56 = '' ;

        bytefrom53to56 = this.trama.substr(104, 8) ;

        if ( bytefrom53to56 ) {
            returned = base.reverseHexadecimal(bytefrom53to56) ;
            returned = base.hexToDec(returned) ;
            returned = returned * 0.01 ;
        }

        return returned ;  
    }

    this.groundSpeed = function() {
        var returned       = '' ;
        var bytefrom57to60 = '' ;

        bytefrom57to60 = this.trama.substr(112, 8) ;

        if ( bytefrom57to60 ) {
            returned = base.reverseHexadecimal(bytefrom57to60) ;
            returned = base.hexToDec(returned) ;
            returned = returned * 0.036 ;
        }

        return returned ; 
    }

    this.speedDirection = function() {
        var returned       = '' ;
        var bytefrom61to62 = '' ;

        bytefrom61to62 = this.trama.substr(120, 4) ;

        if ( bytefrom61to62 ) {
            returned = base.reverseHexadecimal(bytefrom61to62) ;
            returned = base.hexToDec(returned) ;
            returned = returned * (180 / Math.PI) * 0.001 ;
        }

        return returned ; 
    }

    this.utcTimeSeconds = function() {
        var returned = '' ;
        var byte63   = '' ;

        byte63 = this.trama.substr(124, 2) ;

        if ( byte63 ) {
            returned = helper.lpad(base.hexToDec(byte63), 2);
        }

        return returned ; 
    }

    this.utcTimeMinutes = function() {
        var returned = '' ;
        var byte64   = '' ;

        byte64 = this.trama.substr(126, 2) ;

        if ( byte64 ) {
            returned = helper.lpad(base.hexToDec(byte64), 2);
        }

        return returned ;    
    }

    this.utcTimeHours = function() {
        var returned = '' ;
        var byte65   = '' ;

        byte65 = this.trama.substr(128, 2) ;

        if ( byte65 ) {
            returned = helper.lpad(base.hexToDec(byte65), 2);
        }

        return returned ; 
    }

    this.utcTimeDay = function() {
        var returned = '' ;
        var byte66   = '' ;

        byte66 = this.trama.substr(130, 2) ;

        if ( byte66 ) {
            returned = helper.lpad(base.hexToDec(byte66), 2);
        }

        return returned ; 
    }

    this.utcTimeMonth = function() {
        var returned = '' ;
        var byte67   = '' ;

        byte67 = this.trama.substr(132, 2) ;

        if ( byte67 ) {
            returned = helper.lpad(base.hexToDec(byte67), 2);
        }

        return returned ; 
    }

    this.utcTimeYear = function() {
        var returned       = '' ;
        var bytefrom68to69 = '' ;

        bytefrom68to69 = this.trama.substr(134, 4) ;

        if ( bytefrom68to69 ) {
            returned = base.reverseHexadecimal(bytefrom68to69) ;
            returned = base.hexToDec(returned) ;
        }

        return returned ;   
    }

    this.errorDetectionCode = function() {
        var returned = '' ;
        var byte70   = '' ;

        byte70        = this.trama.substr(138, 2) ;
        bytefrom4to69 = this.trama.substr(8, 130) ;

        return {
            code: function() {
                return byte70 ;
            },
            checksum: function() {
                var detection = tramaGps.checksum(bytefrom4to69) ;
                if ( byte70 === detection ) {
                    error = true ;
                }

                return false ;
            }
        }
    }
}).call(Decode.prototype)

module.exports = Decode;