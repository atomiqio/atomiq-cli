'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-console */

// init babel and stack trace support


exports.babel = babel;

require('babel-polyfill');

require('source-map-support/register');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _Make = require('../lib/commands/Make');

var _Make2 = _interopRequireDefault(_Make);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = new Map([['clean', { description: 'Removes project build artifacts (dist directory)', action: clean }], ['dist', { description: 'Ensures all files are copied to dist', action: dist }], ['babel', { description: 'Transpiles src to dist directory', action: babel }], ['build', { description: 'Build the Docker image for the project', action: build }], ['rebuild', { description: 'Force rebuild fresh Docker image for the project', action: rebuild }],
//  [ 'watch-src', { description: 'Watch src directory and update dist', action: watchsrc }],
['watch-dist', { description: 'Watch dist directory and restart server', action: watchdist }]]);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2);

    var key = _step$value[0];
    var value = _step$value[1];

    _commander2.default.command(key).description(value.description).action(value.action);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

_commander2.default.parse(process.argv);

function runtask(task) {
  var log = (0, _debug2.default)('atomiq:make:' + task);
  log('running task ' + task);
  var make = new _Make2.default();
  try {
    make.init();

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    make[task].apply(make, args);
  } catch (err) {
    console.log('[%s] %s', _chalk2.default.red('error'), err.message);
    process.exit(1);
  }
}

/**
 * Removes the dist directory.
 */
function clean(options) {
  runtask('clean');
}

/**
 * Copies all files over to the dist directory
 * (not just the transpiled sources).
 */
function dist(options) {
  clean();
  runtask('dist');
}

/**
 * Transpile all the ES6 files in src and place
 * ES5 files and sourcemaps in the dist directory.
 */
function babel(options) {
  dist();
  runtask('babel');
}

/**
 * Build the Docker image for the project.
 */
function build(options) {
  babel();
  runtask('build');
}

/**
 * Rebuild the Docker image for the project.
 */
function rebuild(options) {
  babel();
  runtask('rebuild');
}

/**
 * Watch the src directory and update dist.
 */
function watchsrc(options) {
  dist();
  runtask('watchsrc');
}

/**
 * Watch the dist directory and restart server.
 */
function watchdist(options) {
  runtask('watchdist');
}
//# sourceMappingURL=atomiq-make.js.map