'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShellHelper = require('./ShellHelper');

var _ShellHelper2 = _interopRequireDefault(_ShellHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComposeHelper = function () {
  function ComposeHelper() {
    _classCallCheck(this, ComposeHelper);
  }

  _createClass(ComposeHelper, null, [{
    key: 'build',
    value: function build(options) {
      _ShellHelper2.default.spawn('docker-compose', ['build'], options);
    }
  }, {
    key: 'rebuild',
    value: function rebuild(options) {
      _ShellHelper2.default.spawn('docker-compose', ['build', '--force-rm', '--no-cache'], options);
    }
  }, {
    key: 'up',
    value: function up(options) {
      _ShellHelper2.default.spawn('docker-compose', ['up', '--force-recreate'], options);
    }
  }, {
    key: 'test',
    value: function test(options) {
      _ShellHelper2.default.spawn('docker-compose', ['-f', 'docker-compose.test.yml', 'up', '--force-recreate'], options);
    }
  }, {
    key: 'debug',
    value: function debug(options) {
      _ShellHelper2.default.spawn('docker-compose', ['-f', 'docker-compose.debug.yml', 'up', '--force-recreate'], options);
    }
  }, {
    key: 'production',
    value: function production(options) {
      _ShellHelper2.default.spawn('docker-compose', ['-f', 'docker-compose.production.yml', 'up', '--force-recreate'], options);
    }
  }]);

  return ComposeHelper;
}();

exports.default = ComposeHelper;
//# sourceMappingURL=ComposeHelper.js.map