#!/usr/bin/env node
/* eslint-disable no-console */

// init babel stack trace support
//import 'source-map-support/register'

import * as print from '../lib/io/print'
import * as prompt from '../lib/io/prompt'
import App from '../lib/commands/App'
import chalk from 'chalk'
import cli from 'commander'
import debug from 'debug'
import path from 'path'
import pkg from '../../package.json'

export default cli

cli
  .version(pkg.version)
  .command('make <task>', 'build tasks')


let map = new Map([
  ['new [name]', {
    description: 'Create a new atomiq app',
    action: create
  }],
  ['up', {
    description: 'Run app in a container',
    action: runContainer
  }],
  ['test', {
    description: 'Run app tests in a container',
    action: testContainer
  }],
  ['debug', {
    description: 'Debug app running in a container',
    action: debugContainer
  }],
  ['url', {
    description: 'Get URL (IP:PORT) for running app',
    action: url
  }],
  ['cover', {
    description: 'Generate a code coverage report',
    action: cover
  }],
  ['lint', {
    description: 'Run eslint to check for common issues',
    action: lint
  }],
  ['format', {
    description: 'Reformat source code according to esformatter rules',
    action: format
  }],
])

for (let [key, value] of map) {
  cli
    .command(key)
    .description(value.description)
    .action(trywrap(value.action))
}
if (require.main === module) {
  cli.parse(process.argv)
}

function trywrap(fn) {
  return async (...options) => {
    try {
      await fn(...options)
    } catch (err) {
      print.error(err)
      process.exit(1)
    }
  }
}

/**
 * Create a new app.
 */
async function create(...options) {
  const log = debug('atomiq:app:new')
  log('Creating a new app')

  let dest = process.cwd()
  let context = {
    name: options[0],
    type: 'api',
  }

  context = await prompt.newProject(context)

  let source = path.join(__dirname, `../../generator/${context.type}/template`)

  App.create(source, dest, context)

  if (context.type === 'lib') {
    print.ok('To build your package, enter:\n%s\n%s',
      chalk.bold('   cd ' + context.name),
      chalk.bold('   atomiq test'))
  } else {
    print.ok('To run the app in a Docker container, enter:\n%s\n%s\n%s',
      chalk.bold('   cd ' + context.name),
      chalk.bold('   atomiq make build'),
      chalk.bold('   atomiq up'))
  }
}

function runContainer(...options) {
  const log = debug('atomiq:new')
  log('Run app in a container')
  App.up(options)
}

function testContainer(...options) {
  const log = debug('atomiq:app:test')
  log('Run tests in a container')
  App.test(options)
}

function debugContainer(...options) {
  const log = debug('atomiq:app:debug')
  log('Debug app running in a container')
  App.debug(options)
}

function url(...options) {
  const log = debug('atomiq:app:url')
  log('Getting URL for running app')
  App.url(options)
}

function cover(...options) {
  const log = debug('atomiq:app:cover')
  log('Generate code coverage report')
  App.cover(options)
}

function lint(...options) {
  const log = debug('atomiq:app:lint')
  log('Run eslint to check for common issues')
  App.lint(options)
}

function format(...options) {
  const log = debug('atomiq:app:format')
  log('Reformat source code using esformatter')
  App.format(options)
}
