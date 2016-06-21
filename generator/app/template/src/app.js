import 'babel-polyfill'
import 'source-map-support/register'

import debug from 'debug'
const log = debug('app')

if (require.main === module) {
  // optional
  handleExitSignals()

  console.log('hello, world')
}

function handleExitSignals() {
  // handle ctrl-c
  exitOnSignal('SIGINT')
  // handle docker stop
  exitOnSignal('SIGTERM')

  function exitOnSignal(signal) {
    process.on(signal, () => {
      log(`$(signal) received, exiting now...`)
      process.exit()
    })
  }
}
