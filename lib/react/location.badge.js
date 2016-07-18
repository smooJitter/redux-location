'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _locationBadge = require('./location.badge.src');

var _locationBadge2 = _interopRequireDefault(_locationBadge);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state) {
  return { location: state[_config.SERVICE] };
})(_locationBadge2.default);