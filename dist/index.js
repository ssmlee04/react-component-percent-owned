"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NumberOfEmployees = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactChartjs = require("react-chartjs-2");

var _reactCopyToClipboard = require("react-copy-to-clipboard");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _dayjsPluginUtc = _interopRequireDefault(require("dayjs-plugin-utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

_dayjs["default"].extend(_dayjsPluginUtc["default"]);

var NumberOfEmployees =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberOfEmployees, _React$Component);

  function NumberOfEmployees(props) {
    var _this;

    _classCallCheck(this, NumberOfEmployees);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberOfEmployees).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(NumberOfEmployees, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          profile = _this$props.profile,
          _this$props$imgProp = _this$props.imgProp,
          imgProp = _this$props$imgProp === void 0 ? 'pct_inst_img' : _this$props$imgProp,
          _this$props$theme = _this$props.theme,
          theme = _this$props$theme === void 0 ? 'light' : _this$props$theme;
      var copied = this.state.copied;

      if (!profile) {
        return _react["default"].createElement("div", {
          style: {
            fontSize: 12
          }
        }, "Not available at this time... ");
      }

      if (profile[imgProp] && profile[imgProp].url) {
        var btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
        var btnText = copied ? 'Copied' : 'Copy Img';
        return _react["default"].createElement("div", {
          className: "react-components-show-button"
        }, _react["default"].createElement("img", {
          alt: "".concat(profile.ticker, " - ").concat(profile.name, " Employees and Productivity"),
          src: profile[imgProp].url,
          style: {
            width: '100%'
          }
        }), _react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: profile[imgProp].url || '',
          onCopy: function onCopy() {
            return _this2.setState({
              copied: true
            });
          }
        }, _react["default"].createElement("button", {
          className: btnClass,
          value: btnText
        }, btnText)));
      }

      if (!profile || !profile.numbers || !profile.numbers.percent_institutions_ts) return null;
      if (!profile || !profile.numbers || !profile.numbers.percent_insider_ts) return null;
      var percent_institutions_ts = profile.numbers.percent_institutions_ts || [];
      var percent_insider_ts = profile.numbers.percent_insider_ts || [];
      var percent_institutions = percent_institutions_ts.map(function (d) {
        return d.v;
      });
      var percent_insider = percent_insider_ts.map(function (d) {
        return d.v;
      });
      var fontColor = theme === 'light' ? '#222222' : '#dddddd';
      var dataColor = theme === 'light' ? 'rgba(255, 165, 0, 0.5)' : 'rgba(255, 165, 0, 0.5)';
      var dataColor2 = theme === 'light' ? 'rgba(46, 134, 193, 0.5)' : 'rgba(46, 134, 193, 0.5)';
      var gridColor = theme === 'light' ? 'rgba(80, 80, 80, 0.1)' : 'rgba(255, 255, 255, 0.2)';
      var data1 = {
        // labels: percent_institutions_ts.map(d => dayjs.utc(d.ts).format('YYYYMM')),
        labels: percent_institutions_ts.map(function (d) {
          return (0, _dayjs["default"])(d.ts).format('YYYYMM');
        }),
        datasets: [{
          type: 'line',
          fill: true,
          pointBackgroundColor: 'white',
          backgroundColor: dataColor,
          borderColor: 'rgba(255, 165, 0, 1)',
          lineTension: 0.5,
          borderWidth: 1.5,
          pointRadius: 3,
          pointHoverRadius: 5,
          data: percent_institutions,
          label: 'Percent of Institution Owned'
        }]
      };
      var data2 = {
        // labels: percent_institutions_ts.map(d => dayjs.utc(d.ts).format('YYYYMM')),
        labels: percent_institutions_ts.map(function (d) {
          return (0, _dayjs["default"])(d.ts).format('YYYYMM');
        }),
        datasets: [{
          type: 'line',
          fill: true,
          pointBackgroundColor: 'white',
          backgroundColor: dataColor2,
          borderColor: 'rgba(46, 134, 193, 1)',
          lineTension: 0.5,
          borderWidth: 1.5,
          pointRadius: 3,
          pointHoverRadius: 5,
          data: percent_insider,
          label: 'Percent of Insider Owned'
        }]
      };
      var options1 = {
        legend: {
          labels: {
            fontSize: 12,
            fontColor: fontColor,
            boxWidth: 10
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12,
              fontColor: fontColor
            },
            gridLines: {
              color: gridColor
            },
            barPercentage: 0.4
          }],
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: '1',
            labels: {
              show: true
            },
            gridLines: {
              color: gridColor
            },
            ticks: {
              fontSize: 12,
              fontColor: fontColor,
              callback: function callback(label, index, labels) {
                return Math.floor(label);
              }
            }
          }]
        }
      };
      var options2 = {
        legend: {
          labels: {
            fontSize: 12,
            fontColor: fontColor,
            boxWidth: 10
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12,
              fontColor: fontColor
            },
            gridLines: {
              color: gridColor
            },
            barPercentage: 0.4
          }],
          yAxes: [{
            type: 'linear',
            display: true,
            labels: {
              show: true
            },
            gridLines: {
              color: gridColor
            },
            ticks: {
              fontSize: 12,
              fontColor: fontColor,
              callback: function callback(label, index, labels) {
                return Math.floor(label);
              }
            }
          }]
        }
      };
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5,
          fontSize: 12
        }
      }, _react["default"].createElement("div", {
        className: "theme-darkred-".concat(theme),
        style: {
          fontWeight: 'bold'
        }
      }, profile.ticker, " - ", profile.name, "\xA0", _react["default"].createElement("span", {
        className: "theme-green-".concat(theme)
      }, "Ownership Analysis")), _react["default"].createElement(_reactChartjs.Bar, {
        data: data1,
        height: 150,
        options: options1
      }), _react["default"].createElement(_reactChartjs.Bar, {
        data: data2,
        height: 150,
        options: options2
      }), _react["default"].createElement("div", {
        style: {
          fontSize: 12,
          padding: 5,
          paddingTop: 2
        }
      }, "Generated by ", _react["default"].createElement("a", {
        href: "https://twitter.com/earningsfly",
        target: "_blank",
        className: "theme-darkred-".concat(theme)
      }, "@earningsfly"), " with ", _react["default"].createElement("span", {
        style: {
          fontSize: 16,
          color: 'red'
        }
      }, "\u2764\uFE0F")));
    }
  }]);

  return NumberOfEmployees;
}(_react["default"].Component);

exports.NumberOfEmployees = NumberOfEmployees;
var _default = NumberOfEmployees;
exports["default"] = _default;