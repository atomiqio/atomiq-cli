#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable no-console */

// init babel and stack trace support


require('babel-polyfill');

require('source-map-support/register');

var _App = require('../lib/commands/App');

var _App2 = _interopRequireDefault(_App);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default.version).command('make <task>', 'build tasks');

var map = new Map([['new', { description: 'Create a new atomiq app', action: create }], ['run', { description: 'Create a new atomiq app', action: runContainer }], ['test', { description: 'Create a new atomiq app', action: testContainer }], ['debug', { description: 'Create a new atomiq app', action: debugContainer }]]);

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
 * Create a new app.
 */
function create(options) {
  var log = (0, _debug2.default)('atomiq:app:new');
  log('Creating a new app');

  var source = _path2.default.join(__dirname, '../../generator/app/template');
  var dest = process.cwd();
  var context = {
    name: 'app'
  };

  _prompt2.default.message = _chalk2.default.blue('atomiq');
  _prompt2.default.delimiter = _chalk2.default.cyan(':');

  _prompt2.default.start();
  _prompt2.default.get(['appname'], function (err, result) {
    if (err) {
      console.log('[%s] %s', _chalk2.default.red('error'), err.message);
      process.exit(1);
    }
    context.name = result.appname;
    try {
      _App2.default.create(source, dest, context);
      console.log('[%s] Try running the app (use `up` to run in a container). Enter:\n%s\n%s\n%s or %s', _chalk2.default.bold('OK'), _chalk2.default.bold('   cd ' + context.name), _chalk2.default.bold('   npm install'), _chalk2.default.bold('   atomiq run'), _chalk2.default.bold('atomiq up'));
    } catch (err) {
      console.log('[%s] %s', _chalk2.default.red('error'), err.message);
      process.exit(1);
    }
  });
}

function runContainer(options) {
  var log = (0, _debug2.default)('atomiq:new');
  log('Run app in a container');
  try {
    _App2.default.up(options);
  } catch (err) {
    console.log('[%s] %s', _chalk2.default.red('error'), err.message);
    process.exit(1);
  }
}

function testContainer(options) {
  var log = (0, _debug2.default)('atomiq:app:test');
  log('Run tests in a container');
  try {
    _App2.default.test(options);
  } catch (err) {
    console.log('[%s] %s', _chalk2.default.red('error'), err.message);
    process.exit(1);
  }
}

function debugContainer(options) {
  var log = (0, _debug2.default)('atomiq:app:debug');
  log('Debug app running in a container');
  try {
    _App2.default.debug(options);
  } catch (err) {
    console.log('[%s] %s', _chalk2.default.red('error'), err.message);
    process.exit(1);
  }
}
//# sourceMappingURL=atomiq.js.map