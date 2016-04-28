/*eslint no-invalid-this: "off" */
import { exists } from 'fs'
import { join } from 'path'
import rimraf from 'rimraf'
import { spawn } from 'child_process'

describe('new lib', function() {
  let atomiq = join(process.cwd(), '/dist/bin/atomiq.js')
  let libName = 'test-lib'
  let libDir = join(process.cwd(), libName)
  after(function(done) {
    this.timeout(0)
    rimraf(libDir, done)
  })
  it('should run atomiq new', function(done) {
    this.timeout(12 * 1000)
    let newLib = spawn(atomiq, ['new'], {
      stdio: ['pipe', 1, 2]
    })
    newLib.on('error', done)
    setTimeout(() => {
      newLib.stdin.write('\u001B\u005B\u0042')
    }, 0.5 * 1000)
    setTimeout(() => {
      newLib.stdin.write('\u001B\u005B\u0042')
    }, 1 * 1000)
    setTimeout(() => {
      newLib.stdin.write('\n')
    }, 1.5 * 1000)
    setTimeout(() => {
      newLib.stdin.write(libName)
    }, 2 * 1000)
    setTimeout(() => {
      newLib.stdin.write('\n')
    }, 2.5 * 1000)
    setTimeout(() => {
      newLib.kill('SIGINT')
    }, 10 * 1000)
    newLib.on('close', (code) => {
      if (code && code !== 130) {
        return done(new Error('non zero exit: ' + code))
      }
      done()
    })
  })
  it('should be created', function(done) {
    exists(libDir, (found) => {
      if (!found) {
        return done(new Error('lib folder not found'))
      }
      done()
    })
  })
  it('should babel', function(done) {
    this.timeout(50 * 1000)
    let babel = spawn(atomiq, ['make', 'babel'], {
      cwd: libDir
    })
    babel.on('error', done)
    babel.on('close', (code) => {
      if (code) {
        return done(new Error('babel exited with error code: ' + code));
      }
      done()
    })
  })
  it('should test', function(done) {
    this.timeout(50 * 1000)
    let test = spawn('npm', ['test'], {
      cwd: libDir
    })
    test.on('error', done)
    test.on('close', (code) => {
      if (code) {
        return done(new Error('test exited with error code: ' + code));
      }
      done()
    })
  })
})
