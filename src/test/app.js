/*eslint no-invalid-this: "off" */
import { exists } from 'fs'
import { join } from 'path'
import rimraf from 'rimraf'
import { spawn } from 'child_process'

describe('new app', function() {

  let atomiq = join(process.cwd(), '/dist/bin/atomiq.js')
  let appName = 'test-app'
  let appDir = join(process.cwd(), appName)

  after(function(done) {
    this.timeout(0)
    rimraf(appDir, done)
  })

  it('should run atomiq new', function(done) {
    this.timeout(12 * 1000)
    let newApp = spawn(atomiq, ['new'], {
      stdio: ['pipe', 1, 2]
    })
    newApp.on('error', done)
    setTimeout(() => {
      newApp.stdin.write('\u001B\u005B\u0042')
    }, 0.5 * 1000)
    setTimeout(() => {
      newApp.stdin.write('\n')
    }, 1 * 1000)
    setTimeout(() => {
      newApp.stdin.write(appName)
    }, 1.5 * 1000)
    setTimeout(() => {
      newApp.stdin.write('\n')
    }, 2 * 1000)
    setTimeout(() => {
      newApp.kill('SIGINT')
    }, 10 * 1000)
    newApp.on('close', code => {
      if (code && code !== 130) {
        return done(new Error('non zero exit: ' + code))
      }
      done()
    })
  })

  it('should be created', function(done) {
    exists(appDir, found => {
      if (!found) {
        return done(new Error('app folder not found'))
      }
      done()
    })
  })

  it('should babel', function(done) {
    this.timeout(50 * 1000)
    let babel = spawn(atomiq, ['make', 'babel'], {
      cwd: appDir
    })
    babel.on('error', done)
    babel.on('close', code => {
      if (code) {
        return done(new Error('babel exited with error code: ' + code))
      }
      done()
    })
  })

  it('should test', function(done) {
    this.timeout(50 * 1000)
    let test = spawn('npm', ['test'], {
      cwd: appDir
    })
    test.on('error', done)
    test.on('close', code => {
      if (code) {
        return done(new Error('test exited with error code: ' + code))
      }
      done()
    })
  })

})
