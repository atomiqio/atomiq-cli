'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;
exports.str = str;
exports.ln = ln;
exports.ok = ok;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function error(err) {
  var message = err.message ? err.message : String(err);
  console.log('[%s] %s', _chalk2.default.red('error'), message);
} /* eslint-disable no-console */


function str() {
  var _console;

  (_console = console).write.apply(_console, arguments);
}

function ln() {
  var _console2;

  (_console2 = console).log.apply(_console2, arguments);
}

function ok() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args[0] = _chalk2.default.green.bold('OK') + ' ' + args[0];
  ln.apply(undefined, args);
}
//# sourceMappingURL=print.js.map