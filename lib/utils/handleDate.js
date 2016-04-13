'use strict';

var moment = require('moment');
var CUSTOM_DATE = require('../constants/').customDate;

var HandleDate = (function() {
	// change the global locale
	moment.locale(CUSTOM_DATE.locale);

	var _FORMAT = CUSTOM_DATE.dateTimeformat;

	function _changeFormat(format) {
		_FORMAT = format || CUSTOM_DATE.dateTimeformat;
	}

	/*
	 * Descripcion: Formatear la fecha
	 * @param {moment} date: fecha que se desea formatear
	 * @param {string} format: formato que se desea recupeara
	 * @return {string}
	 */
	function _format(date, format) {
		format = format || _FORMAT;

		return date.format(format);
	}

	/*
	 * Descripcion: Generar una fecha con "moment"
	 * @param {string} date: fecha que se desea parsear 
	 * @param {string} format: formato para la fecha parseada
	 * @return {moment}
	 */
	function _create(date, format) {
		format = format || _FORMAT;

		return moment(date, format, true);
	}

	/*
	 * Descripcion: validar la fecha
	 * @param {string || moment} date: fecha
	 * @return {moment || object}
	 */
	function _evaluateDateValue(date) {
		var dateValid;

		if(typeof date == 'string') {
			dateValid = _create(date);
		} else {
			dateValid = date;
		}
		/*else if(typeof date == 'object') {
			dateValid = date;
		}
		else {
			dateValid = {};
		}*/

		return dateValid;
	}

	return {
		now: function() {
			return moment();
		},
		setFormat: function(format) {
			_changeFormat(format);
		},
	   /**
		* Creamos una fecha a partir de un valor plano (texto)
		* @param {string} date: fecha en texto
		* @param {string} format: formato para la fecha parseada
		* @return {moment}
		*/
		fromText: function(date, toFormat) {
			var customFormat;

			if (typeof date != 'string') {
				return {};
			}

			if (toFormat && (typeof toFormat == 'string' || toFormat instanceof Array)) {
				customFormat = toFormat;
			} else {
				customFormat = _FORMAT;
			}

			return _create(date, customFormat);
		},
	   /**
		* Convertir la fecha a un formato especifico y retornar un valor plano (texto)
		* @param {moment | string} date: fecha
		* @param {string  | Array} format: formato que se desea retornar
		* @return {string | null}
		*/
		toFormat: function(date, toFormatText) {
			var dateValid = _evaluateDateValue(date);

			if (!'isValid' in dateValid || !'format' in dateValid) {
				return null;
			}

			if (dateValid.isValid()) {
				return _format(dateValid, toFormatText);
			}

			return null;
		},
		add: function(date, add, weather) {
			var dateValid = _evaluateDateValue(date);

			if (!'isValid' in dateValid || !'format' in dateValid) {
				return null;
			}

			if (dateValid.isValid()) {
				return dateValid.add(add, weather);
			}

			return null;
		},
		subtract: function(date, subtract, weather) {
			var dateValid = _evaluateDateValue(date);

			if (!'isValid' in dateValid || !'format' in dateValid) {
				return null;
			}

			if (dateValid.isValid()) {
				return dateValid.subtract(subtract, weather);
			}

			return null;
		}
	};
})();

module.exports = HandleDate;