'use strict';

var moment = require('moment');

var base = require('../utils/convertBase')(),
    tramaGps = require('../utils/handleTrama')();

var helper = require('../helpers/')();

var HARDWARE = require('../constants/').hardwareCodes,
    CUSTOM_DATE = require('../constants/').customDate,
    TIME_KEYS = require('../constants/').timeKeys;

var Decode = function() {
  moment.locale(CUSTOM_DATE.locale);

  function process(trama, ip, port) {
      var transmissionTrama = trama;
      var socketIp = ip;
      var socketPort = port;
      var currentDateTime = moment();

      return {
        database: function() {
          var rmuid = this.unitsId();
          var utctime = moment(this.utcTimeYear()+'-'+this.utcTimeMonth()+'-'+this.utcTimeDay()+' '+this.utcTimeHours()+':'+this.utcTimeMinutes()+':'+this.utcTimeSeconds(), CUSTOM_DATE.dateTimeFormat);
              utctime = utctime.isValid() ? utctime.format(CUSTOM_DATE.dateTimeFormat) : null;
          var celldatetime = moment(utctime, CUSTOM_DATE.dateTimeFormat);
              celldatetime = celldatetime.isValid() ? celldatetime.subtract(CUSTOM_DATE.greenwich, TIME_KEYS.h).format(CUSTOM_DATE.dateTimeFormat) : null;
          var gpsx = this.longitudeAndLatitude().latitude();
          var gpsy = this.longitudeAndLatitude().longitude();
          var insertdate = currentDateTime;
              insertdate = insertdate.isValid() ? insertdate.format(CUSTOM_DATE.dateTimeFormat) : null;
          var gpsdatetime = moment(this.utcTimeYear()+'-'+this.utcTimeMonth()+'-'+this.lastGpsFix().dayOfMonth()+' '+this.lastGpsFix().hours()+':'+this.lastGpsFix().minutes()+':'+this.utcTimeSeconds(), CUSTOM_DATE.dateTimeFormat);
              gpsdatetime = gpsdatetime.isValid() ? gpsdatetime.format(CUSTOM_DATE.dateTimeFormat) : null;
          var speed = this.groundSpeed();
          var direction = this.speedDirection();
          var numofsat = this.numberOfSatellitesUsed();
          var locquality = -1;
          var engineon = base.hexToDec(this.unitsModeOfOperation()) === 1 ? 0 : 1;
          var extinputa = base.binToDec(this.unitsInputOutputStatus2stByte().lock());
          var extinputb = base.binToDec(this.unitsInputOutputStatus1stByte().unlockInactive()) === 1 ? 0 : 1;
          var extinputc = base.binToDec(this.unitsInputOutputStatus2stByte().ignitionPortStatus());
          var extinputd = base.binToDec(this.unitsInputOutputStatus1stByte().doorInactive()) === 1 ? 0 : 1;
          var extinpute = base.binToDec(this.unitsInputOutputStatus1stByte().shockInactive()) === 1 ? 0 : 1;
          var extinputf = base.binToDec(this.unitsInputOutputStatus1stByte().panicInactive()) === 1 ? 0 : 1;
          var versionnum = 'HW: <'+this.unitsHardwareVersion().version()+'>, SW: <'+this.unitsSoftwareVersion()+'>';
          var ip = socketIp;
          var inputvoltage = this.analogInput1value() * 1000;
          var backbatvoltage = this.analogInput2value() * 1000;
          var gpspdop = -1;
          var gpsheight = this.altitude();
          var networktypeid = -1;
          var driverid = -1;
          var txreasonid = this.transmissionReason();
          var alertreason = -1;
          var hibernation = base.binToDec(this.communicationControlField().noHibernation());
          var hrnetwork = -1;
          var milecounter = this.mileageCounter();
          var gpsmode1 = base.binToDec(this.mode1());
          var gpsmode2 = base.binToDec(this.mode2());
          var outputa = base.binToDec(this.unitsInputOutputStatus3stByte().gradualStopInactive()) === 1 ? 0 : 1;
          var outputb = -1;
          var outputc = base.binToDec(this.unitsInputOutputStatus4stByte().standardImmobilizer());
          var outputd = base.binToDec(this.unitsInputOutputStatus3stByte().sirenInactive()) === 1 ? 0 : 1;
          var optionalinput = -1;
          var gpscommstatus = -1;
          var rawdata = transmissionTrama;
          var plmn = this.unitsInputOutputStatus4stByte().plmn();
          var sn = this.messageNumerator();
          var messagetype = this.messageType();
          var msgprotocol = -1;
          var tripid = -1;
          var maneuverid = -1;
          var manueverusage = -1;
          var accidentbuffer = -1;
          var itemid = -1;

          return {
            RMUId: rmuid, // Integer
            CellDateTime: celldatetime, // DateTime
            GPSX: gpsx, // Integer
            GPSY: gpsy, // Integer
            GPSDateTime: gpsdatetime, // DateTime
            Speed: speed, // Integer
            Direction: direction, // Integer
            NumOfSat: numofsat, // Integer
            LocQuality: locquality, // Integer
            EngineOn: engineon, // Integer
            ExtInputA: extinputa, // Integer
            ExtInputB: extinputb, // Integer
            ExtInputC: extinputc, // Integer
            ExtInputD: extinputd, // Integer
            ExtInputE: extinpute, // Integer
            ExtInputF: extinputf, // Integer
            VersionNum: versionnum, // Varchar(25)
            IP: ip, // Char(15)
            InputVoltage: inputvoltage, // Integer
            BackBatVoltage: backbatvoltage, // Integer
            GPSPDOP: gpspdop, // Small Integer(2 bytes)
            GPSHEIGHT: gpsheight, // Integer
            NetworkTypeId: networktypeid, // Small Integer(2 bytes)
            InsertDate: insertdate, // DateTime
            UTCTime: utctime, // DateTime
            DriverId: driverid, // Long(8 bytes)
            TxReasonId: txreasonid, // Integer
            AlertReason: alertreason, // Integer
            Hibernation: hibernation, // Integer
            HRNetwork: hrnetwork, // Integer
            MileCounter: milecounter, // Integer
            GPSMode1: gpsmode1, // Integer
            GPSMode2: gpsmode2, // Integer
            OutputA: outputa, // Integer
            OutputB: outputb, // Integer
            OutputC: outputc, // Integer
            OutputD: outputd, // Integer
            OptionalInput: optionalinput, // Integer
            GPSCommStatus: gpscommstatus, // Integer
            RawData: rawdata, // Varchar(2000)
            PLMN: plmn, // Integer
            SN: sn, // Integer
            MessageType: messagetype, // Integer
            MsgProtocol: msgprotocol, // Small Integer(2 bytes)
            TripId: tripid, // Integer
            ManeuverId: maneuverid, // Integer
            ManeuverUsage: manueverusage, // Small Integer(2 bytes)
            AccidentBuffer: accidentbuffer, // Small Integer(2 bytes)
            ItemId: itemid // Long
          }
        },

        systemCode: function() {
          var returned     = '' ;
          var byteFrom1To4 = '' ;

          byteFrom1To4 = transmissionTrama.substr(0, 8) ;

          if ( byteFrom1To4 ) {
            returned = base.hexToAscii(byteFrom1To4) ;
          }

          return returned ;
        },

        messageType: function() {
          var returned = 0 ;
          var byte5 = '' ;

          byte5 = transmissionTrama.substr(8, 2) ;

          if ( byte5 ) {
            returned = base.hexToDec(byte5) ;
          }

          return returned ;
        },

        //@return {integer}
        unitsId: function() {
          var returned     = '' ;
          var byteFrom6To9 = '' ;

          byteFrom6To9 = transmissionTrama.substr(10, 8) ;

          if ( byteFrom6To9 ) {
            returned = base.reverseHexadecimal(byteFrom6To9) ;
            returned = base.hexToDec(returned) ;
          }

          return returned ;
        },

        communicationControlField: function() {
          var bytefrom10to11 = '' ;
          var byte10         = '' ;
          var byte11         = '' ;

          bytefrom10to11 = transmissionTrama.substr(18, 4) ;
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
        },

        messageNumerator: function() {
          var returned = '' ;
          var byte12   = '' ;

          byte12 = transmissionTrama.substr(22, 2) ;

          if ( byte12 ) {
            returned = base.hexToDec(byte12) ;
          }

          return returned ;
        },

        unitsHardwareVersion: function() {
          var byte13   = '';
          var _modem   = '';
          var _modelo  = '';
          var _version = '';

          byte13 = transmissionTrama.substr(24, 2);
          byte13 = base.hexToBin(byte13);

          _modem  = base.binToDec(byte13.substr(0, 3));
          _modelo = base.binToDec(byte13.substr(3, 5));

          for (var index in HARDWARE){
            if ( HARDWARE[index].model.id == _modelo && HARDWARE[index].modem.code == _modem ) {
              _version = HARDWARE[index].id;
            }
          }

          return {
            modem: function() {
              return _modem ;
            },
            modelo: function() {
              return base.decToHex(_modelo) ;
            },
            version: function() {
              return _version ;
            }
          }
        },

        unitsSoftwareVersion: function() {
          var returned = '' ;
          var byte14   = '' ;

          byte14 = transmissionTrama.substr(26, 2) ;

          if ( byte14 ) {
            returned = base.hexToDec(byte14) ;
          }

          return returned ;
        },

        protocolVersionIdentifier: function() {
          var returned = '' ;
          var byte15   = '' ;

          byte15 = transmissionTrama.substr(28, 2) ;

          if ( byte15 ) {
            returned = base.hexToDec(byte15) ;
          }

          return returned ;
        },

        unitsStatusCurrentGsmOperator: function() {
          var returned    = '' ;
          var byte16      = '' ;
          var unitsstatus = '' ;
          var firstnibble   = '' ;

          byte16      = transmissionTrama.substr(30, 2) ;

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
        },

        currentGsmOperator: function() {
          var secondthirdnibble = '' ;
          var byte17   = '' ;

          byte17 = transmissionTrama.substr(32, 2) ;

          if ( byte17 ) {
            secondthirdnibble = byte17 ;
          }

          return secondthirdnibble ;
        },

        transmissionReasonSpecificData: function() {
          var returned = '' ;
          var byte18   = '' ;

          byte18 = transmissionTrama.substr(34, 2) ;

          if ( byte18 ) {
            returned = base.hexToDec(byte18) ;
          }

          return returned ;
        },

        transmissionReason: function() {
          var returned = '' ;
          var byte19   = '' ;

          byte19 = transmissionTrama.substr(36, 2) ;

          if ( byte19 ) {
            returned = base.hexToDec(byte19) ;
          }

          return returned ;
        },

        // Standby Engine Off (1 => off, 0 => on)
        // @return {integer}
        unitsModeOfOperation: function() {
          var returned = '' ;
          var byte20   = '' ;

          byte20 = transmissionTrama.substr(38, 2) ;

          if ( byte20 ) {
            returned = byte20 ;
          }

          return returned ;
        },

        unitsInputOutputStatus1stByte: function() {
          var byte21   = '' ;

          byte21 = transmissionTrama.substr(40, 2) ;
          byte21 = base.hexToBin(byte21) ;

          return {
            unlockInactive: function() {
              // MSB => Bit Mas Significativo
              return byte21.substr(0, 1) ;
            },
            // panic inactive (1 => on, 0 => off)
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
        },

        unitsInputOutputStatus2stByte: function() {
          var byte22   = '' ;

          byte22 = transmissionTrama.substr(42, 2) ;
          byte22 = base.hexToBin(byte22) ;

          return {
            // ignition (1 => Active, 0 => Inactive)
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
        },

        unitsInputOutputStatus3stByte: function() {
          var byte23   = '' ;

          byte23 = transmissionTrama.substr(44, 2) ;
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
        },

        unitsInputOutputStatus4stByte: function() {
          var self = this ;
          var bytefrom24to25 = '' ;
          var byte24         = '' ;
          var byte25         = '' ;

          bytefrom24to25 = transmissionTrama.substr(46, 4) ;

          byte24 = base.hexToBin(bytefrom24to25.substr(0, 2));
          byte25 = bytefrom24to25.substr(2, 2);

          return {
            notCharging: function() {
              // MSB => Bit Mas Significativo
              return byte24.substr(0, 1) ;
            },
            // 1 => mobilizer, 0 => Immobilizer
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
        },

        analogInput1value: function() {
            var returned = '' ;
            var byte26   = '' ;

            byte26 = transmissionTrama.substr(50, 2) ;

            if ( byte26 ) {
                returned = base.hexToDec(byte26) ;
                returned = returned * 0.1176470588235 ;
            }

            return returned ;
        },

        analogInput2value: function() {
            var returned = '' ;
            var byte27   = '' ;

            byte27 = transmissionTrama.substr(52, 2) ;

            if ( byte27 ) {
                returned = base.hexToDec(byte27) ;
                returned = returned * 0.01647058823 ;
            }

            return returned ;
        },

        analogInput3value: function() {
            var returned = '' ;
            var byte28   = '' ;

            byte28 = transmissionTrama.substr(54, 2) ;

            if ( byte28 ) {
                returned = base.hexToDec(byte28) ;
                returned = (returned * 0.4314) - 40 ;
            }

            return returned ;
        },

        analogInput4value: function() {
            var returned = '' ;
            var byte29   = '' ;

            byte29 = transmissionTrama.substr(56, 2) ;

            if ( byte29 ) {
                returned = base.hexToDec(byte29) ;
            }

            return returned ;
        },

        mileageCounter: function() {
            var returned       = '' ;
            var bytefrom30to32 = '' ;

            bytefrom30to32 = transmissionTrama.substr(58, 6) ;

            if ( bytefrom30to32 ) {
                returned = base.reverseHexadecimal(bytefrom30to32) ;
                returned = base.hexToDec(returned) ;
            }

            return returned ;
        },

        multiPurposeField: function() {
            var returned       = '' ;
            var bytefrom33to38 = '' ;

            bytefrom33to38 = transmissionTrama.substr(64, 12) ;

            if ( bytefrom33to38 ) {
                returned = base.reverseHexadecimal(bytefrom33to38) ;
            }

            return returned ;
        },

        lastGpsFix: function() {
            var bytefrom39to40 = '' ;

            bytefrom39to40 = transmissionTrama.substr(76, 4) ;
            bytefrom39to40 = base.reverseHexadecimal(bytefrom39to40) ;
            bytefrom39to40 = base.hexToBin(bytefrom39to40) ;

            return {
                dayOfMonth: function() {
                    return helper.lpad(base.binToDec(bytefrom39to40.substr(0, 5)), 2);
                },
                hours: function() {
                    return helper.lpad(base.binToDec(bytefrom39to40.substr(5, 5)), 2);
                },
                minutes: function() {
                    return helper.lpad(base.binToDec(bytefrom39to40.substr(10, 6)), 2);
                }
            }
        },

        locationStatus: function() {
            var fromunit = '' ;
            var byte41   = '' ;

            byte41 = transmissionTrama.substr(80, 2) ;

            if ( byte41 ) {
                fromunit = base.hexToBin(byte41) ;
            }

            return fromunit ;
        },

        mode1: function() {
            var fromgps = '' ;
            var byte42   = '' ;

            byte42 = transmissionTrama.substr(82, 2) ;

            if ( byte42 ) {
                fromgps = base.hexToBin(byte42) ;
            }

            return fromgps ;
        },

        mode2: function() {
            var fromgps = '' ;
            var byte43   = '' ;

            byte43 = transmissionTrama.substr(84, 2) ;

            if ( byte43 ) {
                fromgps = base.hexToBin(byte43) ;
            }

            return fromgps ;
        },

        numberOfSatellitesUsed: function() {
            var fromgps = '' ;
            var byte44   = '' ;

            byte44 = transmissionTrama.substr(86, 2) ;

            if ( byte44 ) {
                fromgps = base.hexToDec(byte44) ;
            }

            return fromgps ;
        },

        longitudeAndLatitude: function() {
            var returned       = '' ;
            var bytefrom45to52 = '' ;

            bytefrom45to52 = transmissionTrama.substr(88, 16) ;

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
        },

        altitude: function() {
            var returned       = '' ;
            var bytefrom53to56 = '' ;

            bytefrom53to56 = transmissionTrama.substr(104, 8) ;

            if ( bytefrom53to56 ) {
                returned = base.reverseHexadecimal(bytefrom53to56) ;
                returned = base.hexToDec(returned) ;
                returned = returned * 0.01 ;
            }

            return returned ;
        },

        groundSpeed: function() {
            var returned       = '' ;
            var bytefrom57to60 = '' ;

            bytefrom57to60 = transmissionTrama.substr(112, 8) ;

            if ( bytefrom57to60 ) {
                returned = base.reverseHexadecimal(bytefrom57to60) ;
                returned = base.hexToDec(returned) ;
                returned = returned * 0.036 ;
            }

            return returned ;
        },

        speedDirection: function() {
            var returned       = '' ;
            var bytefrom61to62 = '' ;

            bytefrom61to62 = transmissionTrama.substr(120, 4) ;

            if ( bytefrom61to62 ) {
                returned = base.reverseHexadecimal(bytefrom61to62) ;
                returned = base.hexToDec(returned) ;
                returned = returned * (180 / Math.PI) * 0.001 ;
            }

            return returned ;
        },

        utcTimeSeconds: function() {
            var returned = '' ;
            var byte63   = '' ;

            byte63 = transmissionTrama.substr(124, 2) ;

            if ( byte63 ) {
                returned = helper.lpad(base.hexToDec(byte63), 2);
            }

            return returned ;
        },

        utcTimeMinutes: function() {
            var returned = '' ;
            var byte64   = '' ;

            byte64 = transmissionTrama.substr(126, 2) ;

            if ( byte64 ) {
                returned = helper.lpad(base.hexToDec(byte64), 2);
            }

            return returned ;
        },

        utcTimeHours: function() {
            var returned = '' ;
            var byte65   = '' ;

            byte65 = transmissionTrama.substr(128, 2) ;

            if ( byte65 ) {
                returned = helper.lpad(base.hexToDec(byte65), 2);
            }

            return returned ;
        },

        utcTimeDay: function() {
            var returned = '' ;
            var byte66   = '' ;

            byte66 = transmissionTrama.substr(130, 2) ;

            if ( byte66 ) {
                returned = helper.lpad(base.hexToDec(byte66), 2);
            }

            return returned ;
        },

        utcTimeMonth: function() {
            var returned = '' ;
            var byte67   = '' ;

            byte67 = transmissionTrama.substr(132, 2) ;

            if ( byte67 ) {
                returned = helper.lpad(base.hexToDec(byte67), 2);
            }

            return returned ;
        },

        utcTimeYear: function() {
            var returned       = '' ;
            var bytefrom68to69 = '' ;

            bytefrom68to69 = transmissionTrama.substr(134, 4) ;

            if ( bytefrom68to69 ) {
                returned = base.reverseHexadecimal(bytefrom68to69) ;
                returned = helper.lpad(base.hexToDec(returned), 4);
            }

            return returned ;
        },

        errorDetectionCode: function() {
            var returned = '' ;
            var byte70   = '' ;

            byte70        = transmissionTrama.substr(138, 2) ;
            bytefrom4to69 = transmissionTrama.substr(8, 130) ;

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
      }
  }

  return process;
};

module.exports = Decode;
