'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxJournal = require('redux-journal');

var _reduxManager = require('redux-manager');

var _reduxLocation = require('redux-location');

var _Badge = require('material-ui/Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _myLocation = require('material-ui/svg-icons/maps/my-location');

var _myLocation2 = _interopRequireDefault(_myLocation);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tags = _config.TAGS + '.react.location.badge';

var oneDelayedRequest = function oneDelayedRequest(delay, callback, promise) {
  return function () {
    return promise = promise ? promise : _bluebird2.default.delay(delay).then(function () {
      callback();
      promise = undefined;
    });
  };
};

var LocationBadge = function (_React$Component) {
  _inherits(LocationBadge, _React$Component);

  function LocationBadge(props, context) {
    _classCallCheck(this, LocationBadge);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocationBadge).call(this, props, context));

    _initialiseProps.call(_this);

    var _props$serviceName = props.serviceName;
    var serviceName = _props$serviceName === undefined ? _config.SERVICE : _props$serviceName;

    var location = (0, _reduxLocation.locationSelect)(props.location);
    _this.state = {
      badgeContent: 0,
      serviceName: serviceName
    };
    return _this;
  }

  _createClass(LocationBadge, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var location = (0, _reduxLocation.locationSelect)(nextProps.location);
      if (location) {
        this.setState({ badgeContent: location.docs.length() });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Badge2.default,
        {
          badgeContent: this.state.badgeContent,
          badgeStyle: styles.badge,
          secondary: true
        },
        _react2.default.createElement(
          _IconButton2.default,
          { tooltip: 'location', onClick: this.request },
          _react2.default.createElement(_myLocation2.default, null)
        )
      );
    }
  }]);

  return LocationBadge;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentDidMount = function () {
    _bluebird2.default.delay(2000).then(function () {
      var location = (0, _reduxLocation.locationSelect)(_this2.props.location);
      var doc = location.docs.first();
      if (!doc) _this2.request();
    });
  };

  this.request = oneDelayedRequest(2000, function () {
    _reduxManager.manager.dispatch(_reduxLocation.locationActions.locate(), _this2.state.serviceName);
  });
};

LocationBadge.propTypes = {
  location: _react.PropTypes.object.isRequired,
  serviceName: _react.PropTypes.string
};

var styles = {
  badge: { top: 12, right: 12 }
};

exports.default = LocationBadge;