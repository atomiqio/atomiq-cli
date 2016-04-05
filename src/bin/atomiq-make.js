/* eslint-disable no-console */

// init babel and stack trace support
import 'babel-polyfill';
import 'source-map-support/register';

import chalk from 'chalk';
import cli from 'commander';
import debug from 'debug';
import Make from '../lib/commands/Make';

let map = new Map([
  [ 'clean', { description: 'Removes project build artifacts (dist directory)', action: clean }],
  [ 'dist', { description: 'Ensures all files are copied to dist', action: dist }],
  [ 'babel', { description: 'Transpiles src to dist directory', action: babel }],
  [ 'build', { description: 'Build the Docker image for the project', action: build }],
  [ 'rebuild', { description: 'Force rebuild fresh Docker image for the project', action: rebuild }]
]);

for (let [key, value] of map) {
  cli
    .command(key)
    .description(value.description)
    .action(value.action)
    ;
}

cli.parse(process.argv);

function runtask(task, ...args) {
  const log = debug(`atomiq:make:${task}`);
  log(`running task ${task}`);
  const make = new Make();
  try {
    make.init();
    make[task](...args);
  } catch (err) {
    console.log('[%s] %s', chalk.red('error'), err.message);
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
export function babel(options) {
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
