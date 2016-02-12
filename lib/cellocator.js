var Util = require('./lib/util') ;
var util = new Util() ;

function Cellocator(trama, ip, port){
    this.trama = trama || '' ;
    this.port  = port || '' ;
    this.ip    = ip || '' ;
}

Cellocator.prototype.getData = {
    'RMUId': this.getRMUId(),
    'CellDateTime': this.getCellDateTime(),
    'GPSX': this.getGPSX(), // latitud
    'GPSY': this.getGPSY(), // longitud
    'GPSDateTime': this.getGPSDateTime(),
    'Speed': this.getSpeed(), // velocidad
    'Direction': this.getDirection(), // direccion
    'NumOfSat': this.getNumOfSat(),
    'LocQuality': -1,
    'EngineOn': this.getEngineOn(), // ignicion (1)
    'ExtInputA': this.getExtInputA(),
    'ExtInputB': this.getExtInputB(),
    'ExtInputC': this.getExtInputC(), // ignicion (1)
    'ExtInputD': this.getExtInputD(),
    'ExtInputE': this.getExtInputE(),
    'ExtInputF': this.getExtInputF(), // panic (1)
    'VersionNum': this.getVersionNum(),
    'IP': _socket.ip,
    'InputVoltage': this.getInputVoltage(),
    'BackBatVoltage': this.getBackBatVoltage(),
    'GPSPDOP': -1,
    'GPSHEIGHT': this.getGPSHEIGHT(),
    'NetworkTypeId': 0,
    'InsertDate': _localDateTime,
    'UTCTime': this.getUTCTime(),
    'DriverId': '-1',
    'TxReasonId': this.getTxReasonId(), // razon de la transmision
    'AlertReason': -1,
    'Hibernation': -1,
    'HRNetwork': -1,
    'MileCounter': this.getMileCounter(),
    'GPSMode1': this.getGPSMode1(),
    'GPSMode2': this.getGPSMode2(),
    'OutputA': this.getOutputA(),
    'OutputB': -1,
    'OutputC': this.getOutputC(), // inmobilizer(1) / mobilizer(0)
    'OutputD': this.getOutputD(),
    'OptionalInput': -1,
    'GPSCommStatus': this.getGPSCommStatus(),
    'RawData': _trama,
    'PLMN': this.getPLMN(),
    'SN': this.getSN(),
    'MessageType': this.getMessageType(),
    'MsgProtocol': -1,
    'TripId': -1,
    'ManeuverId': -1,
    'ManeuverUsage': -1,
    'AccidentBuffer': -1,
    'ItemId': '-1'
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
    //var returned       = '' ;

    bytefrom10to11 = this.trama.substr(18, 4) ;

    byte11 = util.hexToBin(bytefrom10to11.substr(0, 2)) ;
    byte11 = '00000000' + byte11 ;
    byte11 = byte11.substr(-8) ;

    byte10 = util.hexToBin(bytefrom10to11.substr(2, 2)) ;
    byte10 = '00000000' + byte10 ;
    byte10 = byte10.substr(-8) ;

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
    var returned = '' ;
    var byte13   = '' ;

    byte13 = this.trama.substr(24, 2) ;
    byte13 = util.hexToBin(byte13) ;
    byte13 = '00000000' + byte13 ;
    byte13 = byte13.substr(-8) ;

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

}
/*Cellocator.prototype.getRMUId = function() {
    var rmuid    = '' ;
    var subTrama = '' ;

    subTrama = this.trama.substr(10, 8) ;

    if ( subTrama ) {
        rmuid = util.reverseHexadecimal(subTrama) ;
        rmuid = util.hexToDec(rmuid) ;
    }

    return rmuid ;
}*/

Cellocator.prototype.getUTCTime = function() {
    var _utctime = '0000-00-00 00:00:00' ;

    var _year  = _trama.substr(134, 4) ;
    var _month = _trama.substr(132, 2) ;
    var _day   = _trama.substr(130, 2) ;

    _year   = _util.hexToDec(_util.reverseHexadecimal(_year)) ;
    _month  = _util.hexToDec(_month) ;
    _day    = _util.hexToDec(_day) ;

    var _hour   = _trama.substr(128, 2);
    var _minute = _trama.substr(126, 2);
    var _second = _trama.substr(124, 2);

    _hour   = _util.hexToDec(_hour) ;
    _minute = _util.hexToDec(_minute) ;
    _second = _util.hexToDec(_second) ;

    if ( _year && _month && _day ) {
        _utctime = _year+'-'+_month+'-'+_day+' '+_hour+':'+_minute+':'+_second ;
    }

    return _utctime ;
}



    // modulo de utilidades
    var _gpsUtil = require('./gps-util');

    // objeto de utilidades
    var _util    = new _gpsUtil.Util() ;

    // trama transmitida por el gps
    var _trama   = socket.trama || '';

    // socket por el cual se recibio la trama
    var _socket  = socket || [];

    // fecha actual
    var _localDateTime = _util.today() ;

    /*// serie del gps (decimal) - ok
    this.getRMUId = function(){
        var _rmuid = '' ;
        var _value = '' ;

        _value = _trama.substr(10, 8) ;

        if ( _value ) {
            _rmuid = _util.reverseHexadecimal(_value) ;
            _rmuid = _util.hexToDec(_rmuid) ;
        }

        return _rmuid ;
    }*/

    // serie del gps (hexadecimal) - ok
    this.getUnitId = function(){
        var _unitid = '' ;
        var _value  = '' ;

        _value = _trama.substr(10, 8) ;

        if ( _value ) {
            _unitid = _util.toUpperCase(_value) ;
        }

        return _unitid ;
    }

    /*// Fecha y Hora UTC o Greenwich
    this.getUTCTime = function(){
        var _utctime = '0000-00-00 00:00:00' ;

        var _year  = _trama.substr(134, 4) ;
        var _month = _trama.substr(132, 2) ;
        var _day   = _trama.substr(130, 2) ;

        _year   = _util.hexToDec(_util.reverseHexadecimal(_year)) ;
        _month  = _util.hexToDec(_month) ;
        _day    = _util.hexToDec(_day) ;

        var _hour   = _trama.substr(128, 2);
        var _minute = _trama.substr(126, 2);
        var _second = _trama.substr(124, 2);

        _hour   = _util.hexToDec(_hour) ;
        _minute = _util.hexToDec(_minute) ;
        _second = _util.hexToDec(_second) ;

        if ( _year && _month && _day ) {
            _utctime = _year+'-'+_month+'-'+_day+' '+_hour+':'+_minute+':'+_second ;
        }

        return _utctime ;
    }*/

    // fecha del celular ... ok
    this.getCellDateTime = function(){
        var _celldatetime = '0000-00-00 00:00:00' ;
        var _utctime      = this.getUTCTime() ;

        if ( _utctime ) {
            _celldatetime = _util.dateTimeAddMiliSecond(_utctime, -5*3600*1000) ;

            if ( _celldatetime == 'NaN-NaN-NaN NaN:NaN:NaN' ) {
                _celldatetime = '0000-00-00 00:00:00' ;
            }
        }

        return _celldatetime ;
    }

    // longitud ... ok
    this.getGPSX = function(){
        var _gpsx  = 0 ;
        var _value = '' ;

        _value = _trama.substr(88, 8) ;

        if ( _value ) {
            var hex, dec ;

            hex = _util.reverseHexadecimal(_value) ;
            dec = _util.hexToDec(hex) ;

            if ( hex.substr(0, 1) == 'f' || hex.substr(0, 1) == 'F' ) {
                var dectobin, notbin, bintodec ;

                dectobin = _util.decToBin(dec) ;
                notbin   = _util.notBinary(dectobin) ;
                bintodec = _util.binToDec(notbin) ;

                _gpsx = (bintodec + 1) * -1 * (180 / Math.PI) * Math.pow(10, -8) ;
            }
            else {
                _gpsx = dec * (180 / Math.PI) * Math.pow(10, -9) ;
            }
        }

        return _gpsx ;
    }
    // latitud ... ok
    this.getGPSY = function(){
        var _gpsy  = 0 ;
        var _value = '' ;

        _value = _trama.substr(96, 8) ;

        if ( _value ) {
            var hex, dec ;

            hex = _util.reverseHexadecimal(_value) ;
            dec = _util.hexToDec(hex) ;

            if ( hex.substr(0, 1) == 'f' || hex.substr(0, 1) == 'F' ) {
                var dectobin, notbin, bintodec ;

                dectobin = _util.decToBin(dec) ;
                notbin   = _util.notBinary(dectobin) ;
                bintodec = _util.binToDec(notbin) ;

                dec = (bintodec + 1) * -1 ;
            }

            _gpsy = dec * (180 / Math.PI) * Math.pow(10, -8) ;
        }

        return _gpsy ;
    }

    // fecha del gps ... ok
    this.getGPSDateTime = function(){
        var _gpsdatetime = '0000-00-00 00:00:00' ;
        var _value       = '' ;

        _value = _trama.substr(76, 4) ;

        if ( _value ) {
            var hex, dec, bin, now ;

            now = _util.date() ;
            hex = _util.reverseHexadecimal(_value) ;
            dec = _util.hexToDec(hex) ;
            bin = _util.decToBin(dec) ;

            bin = '0000000000000000' + bin ;
            bin = bin.substr(-16) ;

            var day, hours, minutes ;

            day     = _util.binToDec(bin.substr(0, 5)) ;
            hours   = _util.binToDec(bin.substr(5, 5)) ;
            minutes = _util.binToDec(bin.substr(10, 6)) ;

            _gpsdatetime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + day + ' ' + hours + ':' + minutes + ':00' ;
            _gpsdatetime = _util.dateTime(_gpsdatetime) ;

            if ( _gpsdatetime == 'NaN-NaN-NaN NaN:NaN:NaN' ) {
                _gpsdatetime = '0000-00-00 00:00:00' ;
            }
        }

        return _gpsdatetime ;
    }
    // velocidad (Ground speed) - ok
    this.getSpeed = function(){
        var _speed = 0 ;
        var _value = '' ;

        _value = _trama.substr(112, 8) ;

        if ( _value ) {
            _speed = _util.reverseHexadecimal(_value) ;
            _speed = _util.hexToDec(_speed) ;
            _speed = _speed * 0.036 ;
            _speed = Math.round(_speed) ;
        }

        return _speed ;
    }
    // direccion (Speed direction) - ok
    this.getDirection = function(){
        var _direction = 0 ;
        var _value     = '' ;

        _value = _trama.substr(120, 4) ;

        if ( _value ) {
            _direction = _util.reverseHexadecimal(_value) ;
            _direction = _util.hexToDec(_direction) ;
            _direction = _direction * (180 / Math.PI) * 0.001;
        }

        return _direction ;
    }
    // numero de satelite - ok
    this.getNumOfSat = function(){
        var _numofsat = 0 ;
        var _value = '' ;

        _value = _trama.substr(86, 2) ;

        if ( _value ) {
            _numofsat = _util.hexToDec(_value) ;
        }

        return _numofsat ;
    }

    // Modo de operacion de la unidad - encendido y apagado del motor - ok ...
    this.getEngineOn = function(){
        var _engineon = 0 ;
        var _value = '' ;

        _value = _trama.substr(38, 2) ;

        if ( _value ) {
            if ( _value == '01') {
                _engineon = 0 ;
            }
            else {
                _engineon = 1 ;
            }
        }

        return _engineon ;
    }
    // bloqueo (lock) - ok
    this.getExtInputA = function(){
        var _extinputa = 0 ;
        var _value     = '' ;

        _value = _trama.substr(42, 2) ;

        if ( _value ) {
            var bin ;

            bin = _util.hexToBin(_value) ;

            bin = '0000000' + bin ;
            bin = bin.substr(-8) ;

            _extinputa = bin.substr(5, 1) ;
            _extinputa = _util.binToDec(_extinputa) ;
        }

        return _extinputa ;
    }
    // desbloqueado (unlock) - ok
    this.getExtInputB = function(){
        var _extinputb = 0 ;
        var _value     = '' ;

        _value = _trama.substr(40, 2) ;

        if ( _value ) {
            var bin ;

            bin = _util.hexToBin(_value) ;

            bin = '0000000' + bin ;
            bin = bin.substr(-8) ;

            _extinputb = bin.substr(0, 1) ;
            _extinputb = _util.binToDec(_extinputb) ;

            if ( _extinputb == 0 ) {
                _extinputb = 1 ;
            }
            else {
                _extinputb = 0 ;
            }
        }

        return _extinputb ;
    }
    // ignicion - ok
    this.getExtInputC = function(){
        var _extinputc = 0 ;
        var _value = '' ;

        _value = _trama.substr(42, 2) ;

        if ( _value ) {
            var bin ;

            bin = _util.hexToBin(_value) ;

            bin = '0000000' + bin ;
            bin = bin.substr(-8) ;

            _extinputc = bin.substr(0, 1) ;
            _extinputc = _util.binToDec(_extinputc) ;
        }

        return _extinputc ;
    }
    // puerta (puerta) - ok
    this.getExtInputD = function(){
        var _extinputd = 0 ;
        var _value     = '' ;

        _value = _trama.substr(40, 2) ;

        if ( _value ) {
            var bin ;

            bin = _util.hexToBin(_value) ;

            bin = '0000000' + bin ;
            bin = bin.substr(-8) ;

            _extinputd = bin.substr(7, 1) ;
            _extinputd = _util.binToDec(_extinputd) ;

            if ( _extinputd == 0 ) {
                _extinputd = 1 ;
            }
            else {
                _extinputd = 0 ;
            }
        }

        return _extinputd ;
    }
    // shock inactivo
    this.getExtInputE = function(){
        var _extinpute = 0 ;
        var _value     = '' ;

        _value = _trama.substr(40, 2) ;

        if ( _value ) {
            var bin = _util.hexToBin(_value) ;

            bin = '0000000' + bin ;
            bin = bin.substr(-8) ;

            _extinpute = bin.substr(6, 1) ;
            _extinpute = _util.binToDec(_extinpute) ;

            if ( _extinpute == 0) {
                _extinpute = 1 ;
            }
            else {
                _extinpute = 0 ;
            }
        }

        return _extinpute ;
    }
    // panico (Panic) - ok
    this.getExtInputF = function(){
        var _extinputf = 0 ;
        var _value     = '' ;

        _value = _trama.substr(40, 2) ;

        if ( _value ) {
            var bin = _util.hexToBin(_value) ;

            bin = '0000000' + bin ;
            bin = bin.substr(-8) ;

            _extinputf = bin.substr(1, 1) ;
            _extinputf = _util.binToDec(_extinputf) ;

            if ( _extinputf == 0 ) {
                _extinputf = 1 ;
            }
            else {
                _extinputf = 0 ;
            }
        }

        return _extinputf ;
    }
    // version de hardware y software -  ok
    this.getVersionNum = function(){
        var _versionnum = '' ;
        var _hw = '' ;
        var _sw = '' ;

        _hw = _trama.substr(24, 2) ;
        if ( _hw ) {
            _hw = _util.hexToBin(_hw) ;
            _hw = _util.binToDec(_hw.substr(4, 3)) + ',' + _util.binToHex(_hw.substr(0, 4)) ;
        }
        else {
            _hw = '' ;
        }

        _sw = _trama.substr(26, 2) ;
        if ( _sw ) {
            _sw = _util.hexToDec(_sw) ;
        }
        else {
            _sw = '' ;
        }

        return 'Hw:<' + _hw + '> Sw:<' + _sw + '>';
    }

    // voltaje de la bateria del carro - ok
    this.getInputVoltage = function(){
        var _inputvoltage = 0 ;
        var _value = '' ;

        _value = _trama.substr(50, 2) ;

        if ( _value ) {
            _inputvoltage = _util.hexToDec(_value) ;
            _inputvoltage = _inputvoltage * 117.6470588235 ;
        }

        return _inputvoltage ;
    }
    // voltaje de la bareia del gps - ok
    this.getBackBatVoltage = function(){
        var _backbatvoltage = 0 ;
        var _value = '' ;

        _value = _trama.substr(52, 2) ;

        if ( _value ) {
            _backbatvoltage = _util.hexToDec(_value) ;
            _backbatvoltage = _backbatvoltage * 16.47058823 ;
        }

        return _backbatvoltage ;
    }
    // altitud - ok
    this.getGPSHEIGHT = function(){
        var _gpsheight = 0 ;
        var _value     = '' ;

        _value = _trama.substr(104, 8) ;

        if ( _value ) {
            _gpsheight = _util.reverseHexadecimal(_value) ;
            _gpsheight = _util.hexToDec(_gpsheight) ;
            _gpsheight = _gpsheight * 0.01 ;
        }

        return _gpsheight ;
    }
    // fecha insercíon - ok ... sin usar
    this.getInsertDate = function(){
        return _localDateTime ;
    }

    // transmision - ok
    this.getTxReasonId = function(){
        var _txreasonid = 0 ;
        var _value      = '' ;

        _value = _trama.substr(36, 2) ;

        if ( _value ) {
            _txreasonid = _util.hexToDec(_value) ;
        }

        return _txreasonid ;
    }
    // cuenta kilometros (Mileage Counter) - ok
    this.getMileCounter = function(){
        var _milecounter = 0 ;
        var _value       = '' ;

        _value = _trama.substr(58, 6) ;

        if ( _value ) {
            _milecounter = _util.reverseHexadecimal(_value) ;
            _milecounter = _util.hexToDec(_milecounter) ;
        }

        return _milecounter ;
    }
    // ok
    this.getGPSMode1 = function(){
        var _gpsmode1 = 0 ;
        var _value = '' ;

        _value = _trama.substr(82, 2) ;

        if ( _value ) {
            _gpsmode1 = _util.hexToDec(_value) ;
        }

        return _gpsmode1 ;
    }
    // ok
    this.getGPSMode2 = function() {
        var _gpsmode2 = 0 ;
        var _value = '' ;

        _value = _trama.substr(84, 2) ;

        if ( _value ) {
            _gpsmode2 = _util.hexToDec(_value) ;
        }

        return _gpsmode2 ;
    }
    // Gradual stop - ok
    this.getOutputA = function() {
        var _outputa = 0 ;
        var _value   = '' ;

        _value = _trama.substr(44, 2) ;

        if ( _value ) {
            var bin = _util.hexToBin(_value) ;

            bin = '0000000' + bin ;
            bin = bin.substr(-8) ;

            _outputa = bin.substr(5, 1) ;
            _outputa = _util.binToDec(_outputa) ;
        }

        return _outputa ;
    }
    // immobilizer (Standard Immobilizer) - ok
    this.getOutputC = function(){
        var _outputc = 0 ;
        var _value = '' ;

        _value = _trama.substr(46, 4) ;

        if ( _value ) {
            var bin = _util.hexToBin(_value) ;

            bin = '0000000000000000' + bin ;
            bin = bin.substr(-16) ;

            _outputc = bin.substr(2, 1) ;
            _outputc = _util.binToDec(_outputc) ;
        }

        return _outputc ;
    }
    //sirena (siren) - ok
    this.getOutputD = function(){
        var _outputd = 0 ;
        var _value   = '' ;

        _value = _trama.substr(44, 2) ;

        if ( _value ) {
            var bin = _util.hexToBin(_value) ;

            bin = '0000000' + bin ;
            bin = bin.substr(-8) ;

            _outputd = bin.substr(6, 1) ;
            _outputd = _util.binToDec(_outputd) ;
        }

        return _outputd ;
    }
    //
    this.getGPSCommStatus = function(){
        var _gpscommstatus = 0 ;
        var _value = '' ;

        _value = _trama.substr(30, 2) ;

        if ( _value ) {
            _gpscommstatus = _util.hexToDec(_value) ;
            _gpscommstatus = _gpscommstatus % 2 ;
        }

        return _gpscommstatus ;
    }
    // ok
    this.getPLMN = function(){
        var _plmn = 0 ;
        var _value = '' ;

        _value = _trama.substr(32, 2) ;

        if ( _value ) {
            _plmn = _util.hexToDec(_value) ;
        }

        return _plmn ;
    }
    // numerador de mensaje (decimal) - ok
    this.getSN = function(){
        var _sn    = 0 ;
        var _value = '' ;

        _value = _trama.substr(22, 2) ;

        if ( _value ) {
            _sn = _util.hexToDec(_value) ;
        }

        return _sn ;
    }
    // numerador de mensaje (hexadecimal) - ok
    this.getMessageNumerator = function(){
        var _messagenumerator = '00' ;
        var _value            = '' ;

        _value = _trama.substr(22, 2) ;

        if ( _value ) {
            _messagenumerator = _util.toUpperCase(_value) ;
            _messagenumerator = _messagenumerator.substr(-2) ;
        }

        return _messagenumerator ;
    }
    /*// ok
    this.getMessageType = function(){
        var _messagetype = 0 ;
        var _value       = '' ;

        _value = _trama.substr(8, 2) ;

        if ( _value ) {
            _messagetype = _util.hexToDec(_value) ;
        }

        return _messagetype ;
    }*/
    // comprobacion de la trama
    this.checksum = function(params){
        var trama = '00';

        for (var i = 0; i < params.length; i++) {
            trama = trama+''+params[i];
        };

        var checksum = 0;
        for (var i = 0; i < trama.length - 1; i += 2) {
            checksum += _util.hexToDec(trama.substr(i, 2));
        };

        checksum = '00' + _util.decToHex(checksum) ;
        var byte_menos_significativo = checksum.substr(-2); // nos quedamos con el byte menos significativo

        return byte_menos_significativo;
    }
  // mobilizer
  this.mobilizer = function(unitid, nrocommand, codefield, datatwice1, datatwice2){
      var mcgp                 = '4D434750', // convertido a "ASCII" significa "MCGP"
          error_detection_code = 0,
          commandhex           = '';

      var message_type                      = '00', // tipo de mensaje
          unit_id                           = '00000000' + _util.decToHex(unitid), // serie en hexadecimal del gps
          command_numerador                 = '00' + nrocommand, //'00', //Command Numerator
          authentication_code               = '00000000', // Authentication Code
          command_code_field_repeated       = codefield, //'0303', // Command code field, repeated
          command_data_field_repeats_twice1 = datatwice1, //'0505', // 1° Command data field repeats twice
          command_data_field_repeats_twice2 = datatwice2, //'0000', // 2° Command data field repeats twice
          command_specific_data_field       = '00000000'; // Command Specific Data Field

      unit_id = _util.reverseHexadecimal(unit_id.substr(-8));

      command_numerador = command_numerador.substr(-2);

      error_detection_code = this.checksum([message_type,unit_id,command_numerador,authentication_code,command_code_field_repeated,command_data_field_repeats_twice1,command_data_field_repeats_twice2,command_specific_data_field]);

      commandhex = mcgp+''+message_type+''+unit_id+''+command_numerador+''+authentication_code+''+command_code_field_repeated;
      commandhex = commandhex+''+command_data_field_repeats_twice1+''+command_data_field_repeats_twice2+''+command_specific_data_field+''+error_detection_code;
      commandhex = commandhex.toUpperCase();

      console.log('\n Mobilizer \n => ' + commandhex + '\n');

      return new Buffer(commandhex, 'hex');
  }
    // immobilizer
    this.immobilizer = function(unitid, nrocommand, codefield, datatwice1, datatwice2){
      var mcgp                 = '4D434750', // convertido a "ASCII" significa "MCGP"
          error_detection_code = 0,
          commandhex           = '';

      var message_type                      = '00', // tipo de mensaje
          unit_id                           = '00000000' + _util.decToHex(unitid), // serie en hexadecimal del gps
          command_numerador                 = '00' + nrocommand, //'00', //Command Numerator
          authentication_code               = '00000000', // Authentication Code
          command_code_field_repeated       = codefield, //'0303', // Command code field, repeated
          command_data_field_repeats_twice1 = datatwice1, //'1515', // 1° Command data field repeats twice
          command_data_field_repeats_twice2 = datatwice2, //'0000', // 2° Command data field repeats twice
          command_specific_data_field       = '00000000'; // Command Specific Data Field

      unit_id = _util.reverseHexadecimal(unit_id.substr(-8));

      command_numerador = command_numerador.substr(-2);

      error_detection_code = this.checksum([message_type,unit_id,command_numerador,authentication_code,command_code_field_repeated,command_data_field_repeats_twice1,command_data_field_repeats_twice2,command_specific_data_field]);

      commandhex = mcgp+''+message_type+''+unit_id+''+command_numerador+''+authentication_code+''+command_code_field_repeated;
      commandhex = commandhex+''+command_data_field_repeats_twice1+''+command_data_field_repeats_twice2+''+command_specific_data_field+''+error_detection_code;
      commandhex = commandhex.toUpperCase();

      console.log('\n Immobilizer \n => ' + commandhex + '\n');

      return new Buffer(commandhex, 'hex');
    }
    // ack - respuesta al gps ... ok
    this.ack = function(nrocommand){
        var mcgp                  = '4D434750',
            error_detection_code  = 0,
            command               = '';

        var message_type               = '04',
            unit_id                    = this.getUnitId(),
            command_numerador          = '00' + nrocommand,//'00',
            authentication_code        = '00000000',
            action_code                = '00',
            message_numerator_received = this.getMessageNumerator(),
            unused_bytes               = '0000000000000000000000';

        command_numerador = command_numerador.substr(-2);

        error_detection_code = this.checksum([
                                              message_type,
                                              unit_id,
                                              command_numerador,
                                              authentication_code,
                                              action_code,
                                              message_numerator_received,
                                              unused_bytes
                                            ]);
        //  4D434750                -> 8bytes
        //  04                      -> 2bytes
        //  49a91100                -> 8bytes
        //  00                      -> 2bytes
        //  00000000                -> 8bytes
        //  00                      -> 2bytes
        //  35                      -> 2bytes
        //  0000000000000000000000  -> 22bytes
        //  3c                      -> 2bytes
        //  =================================
        //                             56bytes - ok

        command = mcgp + '' + message_type + '' + unit_id + '' + command_numerador + '' + authentication_code + '' + action_code;
        command = command + '' + message_numerator_received + '' + unused_bytes + '' + error_detection_code;
        command = command.toUpperCase();
        //return command;
        return new Buffer(command, 'hex');
    }
  // Erase tracking log from EEPROM memory
    this.eraseTrackingLogMemory = function(unitid, nrocommand, codefield, datatwice1, datatwice2){
        var mcgp                 = '4D434750',
            error_detection_code = 0,
            commandhex           = '';

        var message_type                      = '00',
            unit_id                           = '00000000' + _util.decToHex(unitid), // serie en hexadecimal del gps
            command_numerador                 = '00' + nrocommand,//'00',
            authentication_code               = '00000000',
            command_code_field_repeated       = codefield, //'0D0D',
            command_data_field_repeats_twice1 = datatwice1, //'0000',
            command_data_field_repeats_twice2 = datatwice2, //'0000',
            command_specific_data_field       = '00000000';

        unit_id = _util.reverseHexadecimal(unit_id.substr(-8));

        command_numerador = command_numerador.substr(-2);

        error_detection_code = this.checksum([
                                              message_type,
                                              unit_id,
                                              command_numerador,
                                              authentication_code,
                                              command_code_field_repeated,
                                              command_data_field_repeats_twice1,
                                              command_data_field_repeats_twice2,
                                              command_specific_data_field
                                            ]);

        commandhex = mcgp + '' + message_type + '' + unit_id + '' + command_numerador + '' + authentication_code + '' + command_code_field_repeated;
        commandhex = commandhex + '' + command_data_field_repeats_twice1 + '' + command_data_field_repeats_twice2 + '' + command_specific_data_field + '' + error_detection_code;
        commandhex = commandhex.toUpperCase();

        console.log('\n Limpiar Log \n => ' + commandhex + '\n');

        //return commandhex;
        return new Buffer(commandhex, 'hex');
    }

    this.infoTrama = function(infodb){
        infodb = infodb || {'status': '', 'message': ''} ;

        var info = '';

        info += 'GPS: Cellocator / UnitID: ' + this.getRMUId() + '\n';
        info += 'IP: ' + _socket.ip + ' / ' + 'Puerto: ' + _socket.puerto + '\n';
        info += 'Protocolo: ' + _socket.protocolo + '\n';
        info += 'Fecha Insercion: ' + _localDateTime + ' / Fecha Transmision: ' + this.getCellDateTime() + '\n';
        info += 'Trama: ' + _trama.toString() + '\n';
        info += 'Estado Insert: ' + infodb['status'] + '\n';
        info += 'Mensaje Insert: ' + infodb['message'] + '\n\n';

        return  info;
    }

    this.data = function(){
        var data = {
            'RMUId'             : this.getRMUId(),
            'CellDateTime'      : this.getCellDateTime(),
            'GPSX'              : this.getGPSX(), // latitud
            'GPSY'              : this.getGPSY(), // longitud
            'GPSDateTime'       : this.getGPSDateTime(),
            'Speed'             : this.getSpeed(), // velocidad
            'Direction'         : this.getDirection(), // direccion
            'NumOfSat'          : this.getNumOfSat(),
            'LocQuality'        : -1,
            'EngineOn'          : this.getEngineOn(), // ignicion (1)
            'ExtInputA'         : this.getExtInputA(),
            'ExtInputB'         : this.getExtInputB(),
            'ExtInputC'         : this.getExtInputC(), // ignicion (1)
            'ExtInputD'         : this.getExtInputD(),
            'ExtInputE'         : this.getExtInputE(),
            'ExtInputF'         : this.getExtInputF(), // panic (1)
            'VersionNum'        : this.getVersionNum(),
            'IP'                : _socket.ip,
            'InputVoltage'      : this.getInputVoltage(),
            'BackBatVoltage'    : this.getBackBatVoltage(),
            'GPSPDOP'           : -1,
            'GPSHEIGHT'         : this.getGPSHEIGHT(),
            'NetworkTypeId'     : 0,
            'InsertDate'        : _localDateTime,
            'UTCTime'           : this.getUTCTime(),
            'DriverId'          : '-1',
            'TxReasonId'        : this.getTxReasonId(), // razon de la transmision
            'AlertReason'       : -1,
            'Hibernation'       : -1,
            'HRNetwork'         : -1,
            'MileCounter'       : this.getMileCounter(),
            'GPSMode1'          : this.getGPSMode1(),
            'GPSMode2'          : this.getGPSMode2(),
            'OutputA'           : this.getOutputA(),
            'OutputB'           : -1,
            'OutputC'           : this.getOutputC(), // inmobilizer(1) / mobilizer(0)
            'OutputD'           : this.getOutputD(),
            'OptionalInput'     : -1,
            'GPSCommStatus'     : this.getGPSCommStatus(),
            'RawData'           : _trama,
            'PLMN'              : this.getPLMN(),
            'SN'                : this.getSN(),
            'MessageType'       : this.getMessageType(),
            'MsgProtocol'       : -1,
            'TripId'            : -1,
            'ManeuverId'        : -1,
            'ManeuverUsage'     : -1,
            'AccidentBuffer'    : -1,
            'ItemId'            : '-1'
        };

        return data;
    };

module.exports = cellocator;