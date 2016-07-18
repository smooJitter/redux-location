'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _locationObserver = require('./location.observer.src');

var _locationObserver2 = _interopRequireDefault(_locationObserver);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state) {
  return { location: state[_config.SERVICE] };
})(_locationObserver2.default);