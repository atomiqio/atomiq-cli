# Atomiq CLI

This is a complete rewrite of the original CLI and also a replacement for the yeoman generator (`generator-atomiq`).

## Usage

    $ atomiq <subcommand> [options]

    Currently the CLI is completely silent. To enable output, run it this this:

    $ DEBUG=atomiq* atomiq <subcommand> [options]

## Atomiq CLI development

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
