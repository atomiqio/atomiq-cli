/* eslint-disable no-console */

// init babel and stack trace support
import 'babel-polyfill';
import 'source-map-support/register';

import chalk from 'chalk';
import cli from 'commander';
import debug from 'debug';
import Generator from '../lib/tasks/Generator';
import path from 'path';

let map = new Map([
  [ 'create', { description: 'Create a new atomiq app', action: create }]
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
  const log = debug('atomiq:app:create');
  log('Creating a new app');

  let source = path.join(__dirname, '../../generator/app/template');
  let dest = process.cwd();
  let context = {
    name: 'app'
  };

  try {
    Generator.generate(source, dest, context);
    console.log('[%s] Try running the app (use `up` to run in a container). Enter:\n%s\n%s\n%s or %s',
      chalk.bold('OK'),
      chalk.bold('   cd ' + context.name),
      chalk.bold('   npm install'),
      chalk.bold('   atomiq run'),
      chalk.bold('atomiq up'));
  } catch (err) {
    console.log('[%s] %s', chalk.red('error'), err.message);
  }
}
