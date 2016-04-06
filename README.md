# Atomiq CLI

This is an alpha release.

> Generate Node microservices with support for Docker, ES6 and async/await,
  Node Inspector, and optional, straight-forward directory-based routing conventions.

[![npm badge][npm-image]][npm-url]
[![npm downloads][downloads-image]][downloads-url]

[atomiq] provides very lightweight structure and support useful for
Express-based microservices. It is not a framework and doesn't get in
the way of Express, but it does offer a nice convention for
directory-based routing using ES6 classes that you can leverage if you choose to.

This generator will scaffold an app that correctly handles signals
for graceful server shutdown, including inside of a Docker container.
It provides a useful set of docker-compose files for running containers
for production and development (mounts the local `dist` directory
during development).

It generates a few sample routes using ES6 classes and provides a simple
Node.js make script that supports building, running, and testing
locally and in a Docker container.

This is a complete rewrite of the original CLI and also a replacement for the yeoman generator ([generator-atomiq]).

Features:

  * Docker support for production and development, including debugging support with [Node Inspector]
  * Signal handling for graceful server shutdown (including inside of Docker containers)
  * [Babel] support
  * [ESLint] / [esformatter] support

## Usage

    $ atomiq <command> [options]

To see more command details, run

    $ atomiq --help [or -h]

	or

	$ atomiq <command> --help [or -h]

The CLI is fairly silent. To enable debug output, set the DEBUG environment variable:

    $ DEBUG=atomiq* atomiq <subcommand> [options]

## Atomiq CLI development for contributors

  ### make.js script

  This project has a `make.js` script that supports building, running, and testing both locally
  and in a Docker container.

   * `node make clean` - remove the `dist` directory
   * `node make babel` - transpile `src` to `dist` with sourcemaps (ES6 and async/await support)
   * `node make build` - transpile, then build a Docker image
   * `node make run [--local]` - start in container or start locally
   * `node make test [--local]` - run mocha tests in container or locally
   * `node make debug [--local]` - run with debugging support in container or locally
   * `node make watch [--local]` - when anything in src changes, re-transpile to dist

  ### Development workflow

  terminal #1

    $ node make build
    $ npm ln

    # watch for changes in src and update dist
    $ node make watch

  terminal #2

    $ DEBUG=atomiq* atomiq <subcommand> [options]

  ### Testing

      $ node make test [--local]

  ### Debugging

      $ node make debug [--local]

  Open node inspector in browser

  local:

      $ open http://192.168.99.100:8080/?ws=192.168.99.100:8080&port=5858

  container:

     $ IP=$(docker-machine ip <machine>)
     $ open http://$IP:8080/?ws=$IP:8080&port=5858


[atomiq]: https://github.com/atomiqio/atomiq
[Babel]: https://babeljs.io
[ESLint]: http://eslint.org/
[esformatter]: https://github.com/millermedeiros/esformatter
[generator-atomiq]: https://github.com/atomiqio/generator-atomiq
[Node Inspector]: https://github.com/node-inspector/node-inspector
[npm]: https://www.npmjs.com/
[npm-image]: https://img.shields.io/npm/v/atomiq-cli.svg
[npm-url]: https://npmjs.org/package/atomiq-cli
[downloads-image]: https://img.shields.io/npm/dm/atomiq-cli.svg
[downloads-url]: https://npmjs.org/package/atomiq-cli
[Yeoman]: http://yeoman.io
