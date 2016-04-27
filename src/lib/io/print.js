/* eslint-disable no-console */
import chalk from 'chalk'

export function error(err) {
  let message = err.message ? err.message : String(err)
  console.log('[%s] %s', chalk.red('error'), message)
}

export function str(...args) {
  console.write(...args)
}

export function ln(...args) {
  console.log(...args)
}

export function ok(...args) {
  args[0] = `${chalk.green.bold('OK')} ` + args[0]
  ln(...args)
}
