import cli from 'commander';
import debug from 'debug';

let map = new Map([
  [ 'clean', { description: 'Removes project build artifacts (dist directory)', action: clean }],
  [ 'babel', { description: 'Transpiles src to dist directory', action: babel }],
  [ 'dist', { description: 'Ensures all non-js files are also copied to dist', action: dist }],
  [ 'image', { description: 'Build the Docker image for the project', action: image }],
  [ 'build', { description: 'Run all tasks required for building the project', action: build }]
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
 * Removes the dist directory.
 */
function clean() {
  const log = debug('make:clean');
  log('Deleting dist...');
}

/**
 * Transpile all the ES6 files in src and place
 * ES5 files and sourcemaps in the dist directory.
 */
function babel() {
  clean();
  const log = debug('make:babel');
  log('Transpiling src to dist...');
}

/**
 * Copies all files over to the dist directory
 * (not just the transpiled sources).
 */
function dist() {
  babel();
  const log = debug('make:dist');
  log('Copying all non-js files to dist...');
}

/**
 * Build the Docker image for the project.
 */
function image() {
  dist();
  const log = debug('make:image');
  log('Building the Docker image...');
}

/**
 * Ensures all build tasks are performed for building the project.
 */
function build() {
  image();
  const log = debug('make:build');
  log('Running all tasks required for building the project...');
}
