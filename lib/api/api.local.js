'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAPILocal = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _detectNode = require('detect-node');

var _detectNode2 = _interopRequireDefault(_detectNode);

var _reduxJournal = require('redux-journal');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tags = _config.TAGS + '.api.local';

var configAPILocal = exports.configAPILocal = function configAPILocal() {
  var locate = function locate() {
    return new _bluebird2.default(function (resolve, reject) {
      (0, _reduxJournal.write)('', tags + '.locate');
      if (_detectNode2.default) return reject(new Error('Your platform does not support geolocation'));
      navigator.geolocation.getCurrentPosition(function (result) {
        var _result$coords = result.coords;
        var latitude = _result$coords.latitude;
        var longitude = _result$coords.longitude;

        var position = { lat: latitude, lng: longitude };
        (0, _reduxJournal.write)('resolve(position = ' + JSON.stringify(position) + ')', tags + '.locate');
        resolve(position);
      }, function (_error) {
        (0, _reduxJournal.error)(_error, tags + '.locate()');
        reject(_error);
      }, {
        enableHighAccuracy: true,
        timeout: 5000
      });
    });
  };

  return { locate: locate };
};