'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = exports.locationTypes = exports.select = exports.locationSelect = exports.saga = exports.locationSaga = exports.reducer = exports.locationReducer = exports.prepareStore = exports.locationPrepareStore = exports.configSaga = exports.locationConfigureSaga = exports.configServiceLocal = exports.locationLocal = exports.configPersist = exports.locationPersist = exports.configMiddlewarePouch = exports.locationConfigMiddlewarePouch = exports.configAPILocal = exports.locationConfigAPILocal = exports.config = exports.locationConfig = exports.actions = exports.locationActions = undefined;

var _api = require('./api/api.local');

var _middleware = require('./middleware/middleware.pouch');

var _service = require('./service/service.local');

var _actions = require('./actions');

var _config = require('./config');

var config = _interopRequireWildcard(_config);

var _persist = require('./persist');

var _reducer = require('./reducer');

var _saga = require('./saga');

var _select = require('./select');

var _store = require('./store');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.locationActions = _actions.actions;
exports.actions = _actions.actions;
exports.locationConfig = config;
exports.config = config;
exports.locationConfigAPILocal = _api.configAPILocal;
exports.configAPILocal = _api.configAPILocal;
exports.locationConfigMiddlewarePouch = _middleware.configMiddlewarePouch;
exports.configMiddlewarePouch = _middleware.configMiddlewarePouch;
exports.locationPersist = _persist.configPersist;
exports.configPersist = _persist.configPersist;
exports.locationLocal = _service.configServiceLocal;
exports.configServiceLocal = _service.configServiceLocal;
exports.locationConfigureSaga = _saga.configSaga;
exports.configSaga = _saga.configSaga;
exports.locationPrepareStore = _store.prepareStore;
exports.prepareStore = _store.prepareStore;
exports.locationReducer = _reducer.reducer;
exports.reducer = _reducer.reducer;
exports.locationSaga = _saga.saga;
exports.saga = _saga.saga;
exports.locationSelect = _select.select;
exports.select = _select.select;
exports.locationTypes = _actions.types;
exports.types = _actions.types;