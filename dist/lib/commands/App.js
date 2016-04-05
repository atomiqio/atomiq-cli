'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComposeHelper = require('../ComposeHelper');

var _ComposeHelper2 = _interopRequireDefault(_ComposeHelper);

var _TemplateHelper = require('../TemplateHelper');

var _TemplateHelper2 = _interopRequireDefault(_TemplateHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, null, [{
    key: 'create',
    value: function create(source, dest, context) {
      _TemplateHelper2.default.generate(source, dest, context);
    }
  }, {
    key: 'up',
    value: function up(options) {
      _ComposeHelper2.default.up(options);
    }
  }, {
    key: 'test',
    value: function test(options) {
      _ComposeHelper2.default.up(options);
    }
  }, {
    key: 'debug',
    value: function debug(options) {
      _ComposeHelper2.default.up(options);
    }
  }, {
    key: 'production',
    value: function production(options) {
      _ComposeHelper2.default.up(options);
    }
  }]);

  return App;
}();

exports.default = App;
//# sourceMappingURL=App.js.map