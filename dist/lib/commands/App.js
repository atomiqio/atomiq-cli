'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComposeHelper = require('../ComposeHelper');

var _ComposeHelper2 = _interopRequireDefault(_ComposeHelper);

var _ShellHelper = require('../ShellHelper');

var _ShellHelper2 = _interopRequireDefault(_ShellHelper);

var _TemplateHelper = require('../TemplateHelper');

var _TemplateHelper2 = _interopRequireDefault(_TemplateHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var spawnopts = {
  env: process.env,
  stdio: 'inherit'
};

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
      _ComposeHelper2.default.up(spawnopts);
    }
  }, {
    key: 'test',
    value: function test(options) {
      _ComposeHelper2.default.test(spawnopts);
    }
  }, {
    key: 'debug',
    value: function debug(options) {
      _ComposeHelper2.default.debug(spawnopts);
    }
  }, {
    key: 'production',
    value: function production(options) {
      _ComposeHelper2.default.production(spawnopts);
    }
  }, {
    key: 'url',
    value: function url(options) {
      var active = void 0,
          host = void 0,
          port = void 0,
          url = void 0;

      try {
        active = _ShellHelper2.default.exec('docker-machine active').toString('utf8').trim();
      } catch (err) {
        throw new Error('Make sure that you have set your environment for Docker.');
      }

      try {
        host = _ShellHelper2.default.exec('docker-machine ip ' + active).toString('utf8').trim();
      } catch (err) {
        throw new Error('Unable to determine machine IP.');
      }

      try {
        port = _ShellHelper2.default.exec('docker-compose port web 3000').toString('utf8').split(':')[1].trim();
      } catch (err) {
        throw new Error('Make sure you are in the app root and that a container is running.');
      }

      try {
        url = host + ':' + port;
        console.log(url);
      } catch (err) {
        console.log(err);
        throw new Error('Make sure that a container is running first.');
      }
    }
  }]);

  return App;
}();

exports.default = App;
//# sourceMappingURL=App.js.map