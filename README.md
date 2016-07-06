# Atomiq CLI

> Node.js microservice development tailored for Docker environments.

### Features

* Generate app, API, and library packages with ES6 and Async functions support.
* Start services and run tests with commands leveraging standard `docker-compose` files.
* Debug containers with Node Inspector.
* API support includes optional directory-based routing conventions to simplify microservice development.
* Signal handling for graceful server shutdown in Docker containers.
* Includes `lint`, `format`, and `cover` commands based on [ESLint], [esformatter], and [isparta].

[![npm badge][npm-image]][npm-url]
[![npm downloads][downloads-image]][downloads-url]

### Caveats

* Primarily for Docker-oriented development
* Only testing with latest versions of Node.js and Alpine

## Install

    npm install -g atomiq-cli

## Usage

    $ atomiq <command> [options]

To see more command details, run

    $ atomiq --help [or -h]

	or

	$ atomiq <command> --help [or -h]

The CLI is generally silent. To enable debug output, set the DEBUG environment variable for the type of project.

    $ DEBUG=atomiq* atomiq <subcommand> [options]

## Generating Projects

With the `atomiq new` command, you can generate `api`, `app`, and `lib` package projects.

### API Generator

The API generator uses [atomiq]  to provide lightweight structure and support useful for
Express-based microservices. Atomiq is not a framework and doesn't get in
the way of Express, but it does offer a nice convention for
directory-based routing using ES6 classes that you can leverage if you choose to.

It generates a few sample routes using ES6 classes and provides a simple
Node.js make script that supports building, running, and testing
locally and in a Docker container.

This is a complete rewrite of the original CLI and also a replacement for the yeoman generator ([generator-atomiq]).

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
[isparta]: https://github.com/douglasduteil/isparta
[Node Inspector]: https://github.com/node-inspector/node-inspector
[npm]: https://www.npmjs.com/
[npm-image]: https://img.shields.io/npm/v/atomiq-cli.svg
[npm-url]: https://npmjs.org/package/atomiq-cli
[downloads-image]: https://img.shields.io/npm/dm/atomiq-cli.svg
[downloads-url]: https://npmjs.org/package/atomiq-cli
[Yeoman]: http://yeoman.io
