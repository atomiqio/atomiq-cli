#!/usr/bin/env node

/* eslint-disable no-console */

// init babel and stack trace support
import 'babel-polyfill';
import 'source-map-support/register';

import App from '../lib/commands/App';
import chalk from 'chalk';
import cli from 'commander';
import prompt from 'prompt';
import debug from 'debug';
import path from 'path';
import pkg from '../../package.json';

cli
  .version(pkg.version)
  .command('make <task>', 'build tasks')
  ;

let map = new Map([
  [ 'new', { description: 'Create a new atomiq app', action: create }],
  [ 'run', { description: 'Create a new atomiq app', action: runContainer }],
  [ 'test', { description: 'Create a new atomiq app', action: testContainer }],
  [ 'debug', { description: 'Create a new atomiq app', action: debugContainer }]
]);

for (let [key, value] of map) {
  cli
    .command(key)
    .description(value.description)
    .action(value.action)
    ;
}

cli.parse(process.argv);

/**
 * Create a new app.
 */
function create(options) {
  const log = debug('atomiq:app:new');
  log('Creating a new app');

  let source = path.join(__dirname, '../../generator/app/template');
  let dest = process.cwd();
  let context = {
    name: 'app'
  };

  prompt.message = chalk.blue('atomiq');
  prompt.delimiter = chalk.cyan(':');

  prompt.start();
  prompt.get(['appname'], (err, result) => {
    if (err) {
      console.log('[%s] %s', chalk.red('error'), err.message);
      process.exit(1);
    }
    context.name = result.appname;
    try {
      App.create(source, dest, context);
      console.log('[%s] Try running the app (use `up` to run in a container). Enter:\n%s\n%s\n%s or %s',
        chalk.bold('OK'),
        chalk.bold('   cd ' + context.name),
        chalk.bold('   npm install'),
        chalk.bold('   atomiq run'),
        chalk.bold('atomiq up'));
    } catch (err) {
      console.log('[%s] %s', chalk.red('error'), err.message);
      process.exit(1);
    }
  });
}

function runContainer(options) {
  const log = debug('atomiq:new');
  log('Run app in a container');
  try {
    App.up(options);
  } catch (err) {
    console.log('[%s] %s', chalk.red('error'), err.message);
    process.exit(1);
  }
}

function testContainer(options) {
  const log = debug('atomiq:app:test');
  log('Run tests in a container');
  try {
    App.test(options);
  } catch (err) {
    console.log('[%s] %s', chalk.red('error'), err.message);
    process.exit(1);
  }
}

function debugContainer(options) {
  const log = debug('atomiq:app:debug');
  log('Debug app running in a container');
  try {
    App.debug(options);
  } catch (err) {
    console.log('[%s] %s', chalk.red('error'), err.message);
    process.exit(1);
  }
}
