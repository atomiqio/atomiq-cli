#!/usr/bin/env node
'use strict';

require('babel-polyfill');

require('source-map-support/register');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// init babel and stack trace support


_commander2.default.version(_package2.default.version).command('make <task>', 'project make tasks').parse(process.argv);
//# sourceMappingURL=atomiq.js.map