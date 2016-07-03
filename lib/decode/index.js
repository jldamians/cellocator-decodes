'use strict';

var moment = require('moment'),
    helper = require('../helpers/'),
    constants = require('../constants/'),
    base = require('../utils/convertBase'),
    tramaGps = require('../utils/handleTrama');

function Decode (trama, ip, port) {
  this.transmissionTrama = trama ? trama : '';
  this.socketIp = ip ? ip : '0.0.0.0';
  this.socketPort = port ? port : 0;
  this.currentDateTime = moment();

  moment.locale(this.CUSTOM_DATE.locale);
}

Decode.prototype.HARDWARE_CODES = constants.hardwareCodes;
Decode.prototype.CUSTOM_DATE = constants.customDate;
Decode.prototype.TIME_KEYS = constants.timeKeys;

Decode.prototype.database = function() {
  var rmuid = this.unitsId();
  var utctime = moment(this.utcTimeYear()+'-'+this.utcTimeMonth()+'-'+this.utcTimeDay()+' '+this.utcTimeHours()+':'+this.utcTimeMinutes()+':'+this.utcTimeSeconds(), this.CUSTOM_DATE.dateTimeFormat);
      utctime = utctime.isValid() ? utctime.format(this.CUSTOM_DATE.dateTimeFormat) : null;
  var celldatetime = moment(utctime, this.CUSTOM_DATE.dateTimeFormat);
      celldatetime = celldatetime.isValid() ? celldatetime.subtract(this.CUSTOM_DATE.greenwich, this.TIME_KEYS.h).format(this.CUSTOM_DATE.dateTimeFormat) : null;
  var gpsx = this.longitudeAndLatitude().longitude();
  var gpsy = this.longitudeAndLatitude().latitude();
  var insertdate = this.currentDateTime;
      insertdate = insertdate.isValid() ? insertdate.format(this.CUSTOM_DATE.dateTimeFormat) : null;
  var gpsdatetime = moment(this.utcTimeYear()+'-'+this.utcTimeMonth()+'-'+this.lastGpsFix().dayOfMonth+' '+this.lastGpsFix().hours+':'+this.lastGpsFix().minutes+':'+this.utcTimeSeconds(), this.CUSTOM_DATE.dateTimeFormat);
      gpsdatetime = gpsdatetime.isValid() ? gpsdatetime.format(this.CUSTOM_DATE.dateTimeFormat) : null;
  var speed = this.groundSpeed();
  var direction = this.speedDirection();
  var numofsat = this.numberOfSatellitesUsed();
  var locquality = -1;
  var engineon = base.hexToDec(this.unitsModeOfOperation()) === 1 ? 0 : 1;
  var extinputa = base.binToDec(this.unitsInputOutputStatus2stByte().lock);
  var extinputb = base.binToDec(this.unitsInputOutputStatus1stByte().unlockInactive) === 1 ? 0 : 1;
  var extinputc = base.binToDec(this.unitsInputOutputStatus2stByte().ignitionPortStatus);
  var extinputd = base.binToDec(this.unitsInputOutputStatus1stByte().doorInactive) === 1 ? 0 : 1;
  var extinpute = base.binToDec(this.unitsInputOutputStatus1stByte().shockInactive) === 1 ? 0 : 1;
  var extinputf = base.binToDec(this.unitsInputOutputStatus1stByte().panicInactive) === 1 ? 0 : 1;
  var versionnum = 'HW: <'+this.unitsHardwareVersion().version+'>, SW: <'+this.unitsSoftwareVersion()+'>';
  var ip = this.socketIp;
  var inputvoltage = this.analogInput1value() * 1000;
  var backbatvoltage = this.analogInput2value() * 1000;
  var gpspdop = -1;
  var gpsheight = this.altitude();
  var networktypeid = -1;
  var driverid = -1;
  var txreasonid = this.transmissionReason();
  var alertreason = -1;
  var hibernation = base.binToDec(this.communicationControlField().noHibernation);
  var hrnetwork = -1;
  var milecounter = this.mileageCounter();
  var gpsmode1 = base.binToDec(this.mode1());
  var gpsmode2 = base.binToDec(this.mode2());
  var outputa = base.binToDec(this.unitsInputOutputStatus3stByte().gradualStopInactive) === 1 ? 0 : 1;
  var outputb = -1;
  var outputc = base.binToDec(this.unitsInputOutputStatus4stByte().standardImmobilizer);
  var outputd = base.binToDec(this.unitsInputOutputStatus3stByte().sirenInactive) === 1 ? 0 : 1;
  var optionalinput = -1;
  var gpscommstatus = -1;
  var rawdata = this.transmissionTrama;
  var plmn = this.unitsInputOutputStatus4stByte().plmn;
  var sn = this.messageNumerator();
  var messagetype = this.messageType();
  var msgprotocol = -1;
  var tripid = -1;
  var maneuverid = -1;
  var manueverusage = -1;
  var accidentbuffer = -1;
  var itemid = -1;

  try {
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
  } finally {
    rmuid = null;
    utctime = null;
    celldatetime = null;
    gpsx = null;
    gpsy = null;
    insertdate = null;
    gpsdatetime = null;
    speed = null;
    direction = null;
    numofsat = null;
    locquality = null;
    engineon = null;
    extinputa = null;
    extinputb = null;
    extinputc = null;
    extinputd = null;
    extinpute = null;
    extinputf = null;
    versionnum = null;
    ip = null;
    inputvoltage = null;
    backbatvoltage = null;
    gpspdop = null;
    gpsheight = null;
    networktypeid = null;
    driverid = null;
    txreasonid = null;
    alertreason = null;
    hibernation = null;
    hrnetwork = null;
    milecounter = null;
    gpsmode1 = null;
    gpsmode2 = null;
    outputa = null;
    outputb = null;
    outputc = null;
    outputd = null;
    optionalinput = null;
    gpscommstatus = null;
    rawdata = null;
    plmn = null;
    sn = null;
    messagetype = null;
    msgprotocol = null;
    tripid = null;
    maneuverid = null;
    manueverusage = null;
    accidentbuffer = null;
    itemid = null;
  }
}
Decode.prototype.systemCode = function() {
  var returned = '',
      byteFrom1To4 = '';

  byteFrom1To4 = this.transmissionTrama.substr(0, 8);

  if (byteFrom1To4) {
    returned = base.hexToAscii(byteFrom1To4);
  }

  return returned;
}
Decode.prototype.messageType = function() {
  var returned = 0,
      byte5 = '';

  byte5 = this.transmissionTrama.substr(8, 2);

  if (byte5) {
    returned = base.hexToDec(byte5);
  }

  return returned;
}
//@return {integer}
Decode.prototype.unitsId = function() {
  var returned = '',
      byteFrom6To9 = '';

  byteFrom6To9 = this.transmissionTrama.substr(10, 8);

  if (byteFrom6To9) {
    returned = base.reverseHexadecimal(byteFrom6To9);
    returned = base.hexToDec(returned);
  }

  return returned;
}
Decode.prototype.communicationControlField = function() {
  var bytefrom10to11 = '',
      byte10 = '',
      byte11 = '';

  bytefrom10to11 = this.transmissionTrama.substr(18, 4);
  byte11 = base.hexToBin(bytefrom10to11.substr(0, 2));
  byte10 = base.hexToBin(bytefrom10to11.substr(2, 2));

  return {
    // LSB => Bit Menos Significativo
    activeTransmission: byte10.substr(-1),
    garminDisabled: byte10.substr(0, 1),
    garminNotConnected: byte10.substr(1, 1),
    directFromRam: byte10.substr(2, 1),
    pspModeIsEnabled: byte10.substr(3, 2),
    notCanOriginatedSpeed: byte10.substr(5, 1),
    // MSB => Bit Mas Significativo
    notCanOriginatedOdometer: byte10.substr(0, 1),
    // MSB => Bit Mas Significativo
    noHibernation: byte11.substr(0, 1),
    momentarySpeed: byte11.substr(1, 1),
    h: byte11.substr(3, 5)
  }
}
Decode.prototype.messageNumerator = function() {
  var returned = '',
      byte12 = '';

  byte12 = this.transmissionTrama.substr(22, 2);

  if (byte12) {
    returned = base.hexToDec(byte12);
  }

  return returned;
}
Decode.prototype.unitsHardwareVersion = function() {
  var byte13 = '',
      modem = '',
      modelo = '',
      version = '';

  byte13 = this.transmissionTrama.substr(24, 2);
  byte13 = base.hexToBin(byte13);

  modem = base.binToDec(byte13.substr(0, 3));
  modelo = base.binToDec(byte13.substr(3, 5));

  for (var index in this.HARDWARE_CODES){
    if (this.HARDWARE_CODES[index].model.id == modelo && this.HARDWARE_CODES[index].modem.code == modem) {
      version = this.HARDWARE_CODES[index].id;
    }
  }

  return {
    modem: modem,
    modelo: base.decToHex(modelo),
    version: version
  }
}
Decode.prototype.unitsSoftwareVersion = function() {
  var returned = '',
      byte14 = '';

  byte14 = this.transmissionTrama.substr(26, 2);

  if (byte14) {
    returned = base.hexToDec(byte14);
  }

  return returned;
}
Decode.prototype.protocolVersionIdentifier = function() {
  var returned = '',
      byte15 = '';

  byte15 = this.transmissionTrama.substr(28, 2);

  if (byte15) {
    returned = base.hexToDec(byte15);
  }

  return returned;
}
Decode.prototype.unitsStatusCurrentGsmOperator = function() {
  var byte16 = '',
      unitsstatus = '',
      firstnibble = '';

  byte16 = this.transmissionTrama.substr(30, 2);

  unitsstatus = byte16.substr(-1) ;
  firstnibble = byte16.substr(0, 1) ;

  unitsstatus = base.hexToBin(unitsstatus) ;

  return {
    // MSB => Bit Mas Significativo
    speedEstimatedByGps: unitsstatus.substr(0, 1),
    correctTime: unitsstatus.substr(1, 1),
    homeNetwork: unitsstatus.substr(2, 1),
    // LSB => Bit Menos Significativo
    gpsCommunicationAvailable: unitsstatus.substr(-1),
    currentGsmOperator1stNibble: firstnibble
  }
}
Decode.prototype.currentGsmOperator = function() {
  var secondthirdnibble = '',
      byte17 = '';

  byte17 = this.transmissionTrama.substr(32, 2);

  if (byte17) {
    secondthirdnibble = byte17;
  }

  return secondthirdnibble;
}
Decode.prototype.transmissionReasonSpecificData = function() {
  var returned = '',
      byte18 = '';

  byte18 = this.transmissionTrama.substr(34, 2);

  if (byte18) {
    returned = base.hexToDec(byte18);
  }

  return returned;
}
Decode.prototype.transmissionReason = function() {
  var returned = '',
      byte19 = '';

  byte19 = this.transmissionTrama.substr(36, 2) ;

  if (byte19) {
    returned = base.hexToDec(byte19);
  }

  return returned;
}
// Standby Engine Off (1 => off, 0 => on)
// @return {integer}
Decode.prototype.unitsModeOfOperation = function() {
  var returned = '',
      byte20 = '';

  byte20 = this.transmissionTrama.substr(38, 2);

  if (byte20) {
    returned = byte20;
  }

  return returned;
}
Decode.prototype.unitsInputOutputStatus1stByte = function() {
  var byte21 = '';

  byte21 = this.transmissionTrama.substr(40, 2);
  byte21 = base.hexToBin(byte21);

  return {
    // MSB => Bit Mas Significativo
    unlockInactive: byte21.substr(0, 1),
    // panic inactive (1 => on, 0 => off)
    panicInactive: byte21.substr(1, 1),
    drivingStatus: byte21.substr(2, 1),
    shockInactive: byte21.substr(6, 1),
    // LSB => Bit Menos Significativo
    doorInactive: byte21.substr(-1)
  }
}
Decode.prototype.unitsInputOutputStatus2stByte = function() {
  var byte22 = '';

  byte22 = this.transmissionTrama.substr(42, 2);
  byte22 = base.hexToBin(byte22);

  return {
    // ignition (1 => Active, 0 => Inactive)
    // MSB => Bit Mas Significativo
    ignitionPortStatus: byte22.substr(0, 1),
    accelerometerStatus: byte22.substr(1, 1),
    lock: byte22.substr(5, 1)
  }
}
Decode.prototype.unitsInputOutputStatus3stByte = function() {
  var byte23 = '';

  byte23 = this.transmissionTrama.substr(44, 2);
  byte23 = base.hexToBin(byte23);

  return {
    gpsPower: byte23.substr(4, 1),
    gradualStopInactive: byte23.substr(5, 1),
    sirenInactive: byte23.substr(6, 1)
  }
}
Decode.prototype.unitsInputOutputStatus4stByte = function() {
  var bytefrom24to25 = '',
      byte24 = '',
      byte25 = '';

  bytefrom24to25 = this.transmissionTrama.substr(46, 4) ;

  byte24 = base.hexToBin(bytefrom24to25.substr(0, 2));
  byte25 = bytefrom24to25.substr(2, 2);

  return {
    // MSB => Bit Mas Significativo
    notCharging: byte24.substr(0, 1),
    // 1 => mobilizer, 0 => Immobilizer
    standardImmobilizer: byte24.substr(2, 1),
    globalOutput: byte24.substr(4, 1),
    // LSB => Bit Menos Significativo
    ledInactive: byte24.substr(-1),
    plmn: base.hexToDec(this.unitsStatusCurrentGsmOperator().currentGsmOperator1stNibble+''+this.currentGsmOperator()+''+byte25)
  }
}
Decode.prototype.analogInput1value = function() {
  var returned = '',
      byte26 = '';

  byte26 = this.transmissionTrama.substr(50, 2);

  if (byte26) {
    returned = base.hexToDec(byte26);
    returned = returned * 0.1176470588235;
  }

  return returned;
}
Decode.prototype.analogInput2value = function() {
  var returned = '',
      byte27 = '';

  byte27 = this.transmissionTrama.substr(52, 2);

  if (byte27) {
    returned = base.hexToDec(byte27);
    returned = returned * 0.01647058823;
  }

  return returned;
}
Decode.prototype.analogInput3value = function() {
  var returned = '',
      byte28 = '';

  byte28 = this.transmissionTrama.substr(54, 2);

  if (byte28) {
    returned = base.hexToDec(byte28);
    returned = (returned * 0.4314) - 40;
  }

  return returned;
}
Decode.prototype.analogInput4value = function() {
  var returned = '';
  var byte29 = '';

  byte29 = this.transmissionTrama.substr(56, 2);

  if (byte29) {
    returned = base.hexToDec(byte29);
  }

  return returned;
}
Decode.prototype.mileageCounter = function() {
  var returned = '',
      bytefrom30to32 = '';

  bytefrom30to32 = this.transmissionTrama.substr(58, 6);

  if (bytefrom30to32) {
    returned = base.reverseHexadecimal(bytefrom30to32);
    returned = base.hexToDec(returned);
  }

  return returned;
}
Decode.prototype.multiPurposeField = function() {
  var returned = '',
      bytefrom33to38 = '';

  bytefrom33to38 = this.transmissionTrama.substr(64, 12);

  if (bytefrom33to38) {
    returned = base.reverseHexadecimal(bytefrom33to38);
  }

  return returned;
}
Decode.prototype.lastGpsFix = function() {
  var bytefrom39to40 = '';

  bytefrom39to40 = this.transmissionTrama.substr(76, 4);
  bytefrom39to40 = base.reverseHexadecimal(bytefrom39to40);
  bytefrom39to40 = base.hexToBin(bytefrom39to40);

  return {
    dayOfMonth: helper.lpad(base.binToDec(bytefrom39to40.substr(0, 5)), 2),
    hours: helper.lpad(base.binToDec(bytefrom39to40.substr(5, 5)), 2),
    minutes: helper.lpad(base.binToDec(bytefrom39to40.substr(10, 6)), 2)
  }
}
Decode.prototype.locationStatus = function() {
  var fromunit = '',
      byte41 = '';

  byte41 = this.transmissionTrama.substr(80, 2);

  if (byte41) {
    fromunit = base.hexToBin(byte41);
  }

  return fromunit;
}
Decode.prototype.mode1 = function() {
  var fromgps = '',
      byte42 = '';

  byte42 = this.transmissionTrama.substr(82, 2);

  if (byte42) {
    fromgps = base.hexToBin(byte42);
  }

  return fromgps;
}
Decode.prototype.mode2 = function() {
  var fromgps = '',
      byte43 = '';

  byte43 = this.transmissionTrama.substr(84, 2);

  if (byte43) {
    fromgps = base.hexToBin(byte43);
  }

  return fromgps;
}
Decode.prototype.numberOfSatellitesUsed = function() {
  var fromgps = '',
      byte44 = '';

  byte44 = this.transmissionTrama.substr(86, 2);

  if (byte44) {
    fromgps = base.hexToDec(byte44);
  }

  return fromgps;
}
Decode.prototype.longitudeAndLatitude = function() {
  var returned = '',
      bytefrom45to52 = '';

  bytefrom45to52 = this.transmissionTrama.substr(88, 16);

  return {
    longitude: function() {
      var gpsy = bytefrom45to52.substr(0, 8),
          lng = 0;

      if (gpsy) {
        gpsy = base.reverseHexadecimal(gpsy);

        if (gpsy.substr(0, 1) === 'F') {
          lng = base.hexToBin(gpsy);
          lng = base.notBinary(lng);
          lng = base.binToDec(lng);
          lng = (lng + 1) * -1 * (180 / Math.PI) * Math.pow(10, -8);
        } else {
          lng = base.hexToDec(gpsy);
          lng = lng * (180 / Math.PI) * Math.pow(10, -9);
        }
      }

      return lng;
    },
    latitude: function() {
      var gpsx = bytefrom45to52.substr(8, 8),
          lat = 0 ;

      if (gpsx) {
        gpsx = base.reverseHexadecimal(gpsx) ;

        if (gpsx.substr(0, 1) === 'F') {
          lat = base.hexToBin(gpsx);
          lat = base.notBinary(lat);
          lat = base.binToDec(lat);
          lat = (lat + 1) * -1;
        } else {
          lat = base.hexToDec(gpsx);
        }

        lat = lat * (180 / Math.PI) * Math.pow(10, -8);
      }

      return lat;
    }
  }
}
Decode.prototype.altitude = function() {
  var returned = '',
      bytefrom53to56 = '';

  bytefrom53to56 = this.transmissionTrama.substr(104, 8);

  if (bytefrom53to56) {
    returned = base.reverseHexadecimal(bytefrom53to56);
    returned = base.hexToDec(returned);
    returned = returned * 0.01;
  }

  return returned;
}
Decode.prototype.groundSpeed = function() {
  var returned = '',
      bytefrom57to60 = '';

  bytefrom57to60 = this.transmissionTrama.substr(112, 8);

  if (bytefrom57to60) {
    returned = base.reverseHexadecimal(bytefrom57to60);
    returned = base.hexToDec(returned);
    returned = returned * 0.036;
  }

  return returned;
}
Decode.prototype.speedDirection = function() {
  var returned = '',
      bytefrom61to62 = '';

  bytefrom61to62 = this.transmissionTrama.substr(120, 4);

  if (bytefrom61to62) {
    returned = base.reverseHexadecimal(bytefrom61to62);
    returned = base.hexToDec(returned);
    returned = returned * (180 / Math.PI) * 0.001;
  }

  return returned;
}
Decode.prototype.utcTimeSeconds = function() {
  var returned = '',
      byte63 = '';

  byte63 = this.transmissionTrama.substr(124, 2);

  if (byte63) {
    returned = helper.lpad(base.hexToDec(byte63), 2);
  }

  return returned;
}
Decode.prototype.utcTimeMinutes = function() {
  var returned = '',
      byte64 = '';

  byte64 = this.transmissionTrama.substr(126, 2);

  if (byte64) {
    returned = helper.lpad(base.hexToDec(byte64), 2);
  }

  return returned;
}
Decode.prototype.utcTimeHours = function() {
  var returned = '',
      byte65 = '';

  byte65 = this.transmissionTrama.substr(128, 2);

  if (byte65) {
    returned = helper.lpad(base.hexToDec(byte65), 2);
  }

  return returned;
}
Decode.prototype.utcTimeDay = function() {
  var returned = '',
      byte66 = '';

  byte66 = this.transmissionTrama.substr(130, 2);

  if (byte66) {
    returned = helper.lpad(base.hexToDec(byte66), 2);
  }

  return returned;
}
Decode.prototype.utcTimeMonth = function() {
  var returned = '',
      byte67 = '';

  byte67 = this.transmissionTrama.substr(132, 2);

  if (byte67) {
    returned = helper.lpad(base.hexToDec(byte67), 2);
  }

  return returned;
}
Decode.prototype.utcTimeYear = function() {
  var returned = '',
      bytefrom68to69 = '';

  bytefrom68to69 = this.transmissionTrama.substr(134, 4);

  if (bytefrom68to69) {
    returned = base.reverseHexadecimal(bytefrom68to69);
    returned = helper.lpad(base.hexToDec(returned), 4);
  }

  return returned;
}
Decode.prototype.errorDetectionCode = function() {
  var byte70,
      bytefrom4to69;

  byte70 = helper.toUpperCase(this.transmissionTrama.substr(138, 2));
  bytefrom4to69 = this.transmissionTrama.substr(8, 130);

  return {
    code: byte70,
    error: byte70 === tramaGps.checksum(bytefrom4to69) ? false : true
  }
}

module.exports = Decode;

