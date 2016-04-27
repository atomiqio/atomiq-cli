#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable no-console */

// init babel and stack trace support


require('babel-polyfill');

require('source-map-support/register');

var _print = require('../lib/io/print');

var print = _interopRequireWildcard(_print);

var _prompt = require('../lib/io/prompt');

var prompt = _interopRequireWildcard(_prompt);

var _App = require('../lib/commands/App');

var _App2 = _interopRequireDefault(_App);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_commander2.default.version(_package2.default.version).command('make <task>', 'build tasks');

var map = new Map([['new', {
  description: 'Create a new atomiq app',
  action: create
}], ['up', {
  description: 'Run app in a container',
  action: runContainer
}], ['test', {
  description: 'Run app tests in a container',
  action: testContainer
}], ['debug', {
  description: 'Debug app running in a container',
  action: debugContainer
}], ['url', {
  description: 'Get URL (IP:PORT) for running app',
  action: url
}]]);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2);

    var key = _step$value[0];
    var value = _step$value[1];

    _commander2.default.command(key).description(value.description).action(trywrap(value.action));
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

function trywrap(fn) {
  var _this = this;

  return function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(fn());

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            print.error(_context.t0);
            process.exit(1);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, null, _this, [[0, 5]]);
  };
}

/**
 * Create a new app.
 */
function create(options) {
  var log, dest, context, source;
  return regeneratorRuntime.async(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          log = (0, _debug2.default)('atomiq:app:new');

          log('Creating a new app');

          dest = process.cwd();
          context = {
            type: 'api'
          };
          _context2.next = 6;
          return regeneratorRuntime.awrap(prompt.newProject(context));

        case 6:
          context = _context2.sent;
          source = _path2.default.join(__dirname, '../../generator/' + context.type + '/template');


          _App2.default.create(source, dest, context);

          print.ok('To run the app in a Docker container, enter:\n%s\n%s\n%s', _chalk2.default.bold('   cd ' + context.name), _chalk2.default.bold('   atomiq make build'), _chalk2.default.bold('   atomiq up'));

        case 10:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this);
}

function runContainer(options) {
  var log = (0, _debug2.default)('atomiq:new');
  log('Run app in a container');
  _App2.default.up(options);
}

function testContainer(options) {
  var log = (0, _debug2.default)('atomiq:app:test');
  log('Run tests in a container');
  _App2.default.test(options);
}

function debugContainer(options) {
  var log = (0, _debug2.default)('atomiq:app:debug');
  log('Debug app running in a container');
  _App2.default.debug(options);
}

function url(options) {
  var log = (0, _debug2.default)('atomiq:app:url');
  log('Getting URL for running app');
  _App2.default.url(options);
}
//# sourceMappingURL=atomiq.js.map