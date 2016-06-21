/*eslint no-invalid-this: "off" */
import { exists } from 'fs'
import { join } from 'path'
import rimraf from 'rimraf'
import { spawn } from 'child_process'

describe('new api', function() {

  let atomiq = join(process.cwd(), '/dist/bin/atomiq.js')
  let apiName = 'test-api'
  let apiDir = join(process.cwd(), apiName)

  after(function(done) {
    this.timeout(0)
    rimraf(apiDir, done)
  })

  it('should run atomiq new', function(done) {
    this.timeout(12 * 1000)
    let newApi = spawn(atomiq, ['new'], {
      stdio: ['pipe', 1, 2]
    })
    newApi.on('error', done)
    setTimeout(() => {
      newApi.stdin.write('\n')
    }, 0.5 * 1000)
    setTimeout(() => {
      newApi.stdin.write(apiName)
    }, 1 * 1000)
    setTimeout(() => {
      newApi.stdin.write('\n')
    }, 1.5 * 1000)
    setTimeout(() => {
      newApi.kill('SIGINT')
    }, 10 * 1000)
    newApi.on('close', code => {
      if (code && code !== 130) {
        return done(new Error('non zero exit: ' + code))
      }
      done()
    })
  })

  it('should be created', function(done) {
    exists(apiDir, found => {
      if (!found) {
        return done(new Error('api folder not found'))
      }
      done()
    })
  })

  it('should babel', function(done) {
    this.timeout(50 * 1000)
    let babel = spawn(atomiq, ['make', 'babel'], {
      cwd: apiDir
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
      cwd: apiDir
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
