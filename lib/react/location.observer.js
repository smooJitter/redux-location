'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxJournal = require('redux-journal');

var _reduxManager = require('redux-manager');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _beenhere = require('material-ui/svg-icons/maps/beenhere');

var _beenhere2 = _interopRequireDefault(_beenhere);

var _actions = require('../actions');

var _config = require('../config');

var _select = require('../select');

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tags = _config.TAGS + '.react.location.observer';

var doOnce = function doOnce(value) {
  var beforeStatus = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  return function (status) {
    var result = status == value && beforeStatus != status;
    beforeStatus = status;
    return result;
  };
};

var LocationObserver = function (_React$Component) {
  _inherits(LocationObserver, _React$Component);

  function LocationObserver(props, context) {
    _classCallCheck(this, LocationObserver);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocationObserver).call(this, props, context));

    _this.isOnceRequest = doOnce(_actions.types.LOCATE_REQUEST);
    _this.isOnceSuccess = doOnce(_actions.types.LOCATE_SUCCESS);
    _this.isOnceFailure = doOnce(_actions.types.LOCATE_FAILURE);

    _this.updateButton = function (payload) {
      return _this.setState({ button: _extends({}, _this.state.button, payload) });
    };

    _this.state = {
      button: {
        style: styles.normal
      }
    };
    return _this;
  }

  _createClass(LocationObserver, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var location = (0, _select.select)(nextProps.location);
      var status = location.status();

      if (this.isOnceRequest(status)) this.updateButton({ style: styles.request });
      if (this.isOnceSuccess(status)) {
        this.updateButton({ style: styles.success });
        _bluebird2.default.delay(2000).then(function () {
          return _this2.updateButton({ style: styles.normal });
        });
      }
      if (this.isOnceFailure(status)) this.updateButton({ style: styles.failure });
    }
  }, {
    key: 'render',
    value: function render() {
      var button = this.state.button;


      return _react2.default.createElement(
        _IconButton2.default,
        button,
        _react2.default.createElement(_beenhere2.default, null)
      );
    }
  }]);

  return LocationObserver;
}(_react2.default.Component);

LocationObserver.propTypes = {
  location: _react.PropTypes.object.isRequired
};

var styles = {
  normal: { backgroundColor: _colors.cyan100 },
  request: { backgroundColor: _colors.yellow100 },
  success: { backgroundColor: _colors.green100 },
  failure: { backgroundColor: _colors.red100 }
};

exports.default = LocationObserver;