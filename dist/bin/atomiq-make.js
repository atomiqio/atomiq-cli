'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = new Map([['clean', { description: 'Removes project build artifacts (dist directory)', action: clean }], ['babel', { description: 'Transpiles src to dist directory', action: babel }], ['dist', { description: 'Ensures all non-js files are also copied to dist', action: dist }], ['image', { description: 'Build the Docker image for the project', action: image }], ['build', { description: 'Run all tasks required for building the project', action: build }]]);

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

/**
 * Removes the dist directory.
 */
function clean() {
  var log = (0, _debug2.default)('make:clean');
  log('Deleting dist...');
}

/**
 * Transpile all the ES6 files in src and place
 * ES5 files and sourcemaps in the dist directory.
 */
function babel() {
  clean();
  var log = (0, _debug2.default)('make:babel');
  log('Transpiling src to dist...');
}

/**
 * Copies all files over to the dist directory
 * (not just the transpiled sources).
 */
function dist() {
  babel();
  var log = (0, _debug2.default)('make:dist');
  log('Copying all non-js files to dist...');
}

/**
 * Build the Docker image for the project.
 */
function image() {
  dist();
  var log = (0, _debug2.default)('make:image');
  log('Building the Docker image...');
}

/**
 * Ensures all build tasks are performed for building the project.
 */
function build() {
  image();
  var log = (0, _debug2.default)('make:build');
  log('Running all tasks required for building the project...');
}
//# sourceMappingURL=atomiq-make.js.map