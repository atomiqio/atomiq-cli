// init babel and stack trace support
import 'babel-polyfill';
import 'source-map-support/register';

import cli from 'commander';
import debug from 'debug';
import Make from '../lib/tasks/Make';

let map = new Map([
  [ 'clean', { description: 'Removes project build artifacts (dist directory)', action: clean }],
  [ 'dist', { description: 'Ensures all files are copied to dist', action: dist }],
  [ 'babel', { description: 'Transpiles src to dist directory', action: babel }],
  [ 'image', { description: 'Build the Docker image for the project', action: image }],
  [ 'build', { description: 'Run all tasks required for building the project', action: build }],
  [ 'rebuild', { description: 'Run all tasks required for completely rebuilding the project', action: rebuild }]
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
  make.init();
  make[task](...args);
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
function image(options) {
  babel();
  runtask('image');
}

/**
 * Ensures all build tasks are performed for building the project.
 */
function build(options) {
  image();
  runtask('build');
}

/**
 * Ensures all build tasks are performed for completely rebuilding the project.
 */
function rebuild(options) {
  image();
  runtask('rebuild');
}
