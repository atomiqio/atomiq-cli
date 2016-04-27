import { exec } from 'child_process'

const usage = `
  Usage: atomiq [options] [command]


  Commands:

    make <task>  build tasks
    new          Create a new atomiq app
    up           Run app in a container
    test         Run app tests in a container
    debug        Debug app running in a container
    url          Get URL (IP:PORT) for running app
    help [cmd]   display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

`

describe('help', function () {
  it('should display the usage information', function (done) {
    this.timeout(30 * 1000)
    exec('./dist/bin/atomiq.js', function (error, stdout, stderr) {
      if (error) {
        done(error)
      } else if (stderr) {
        done(new Error('unexpect stderr: ' + stderr))
      } else if (stdout !== usage) {
        done(new Error('unexpected usage: ' + stdout))
      } else {
        done()
      }
    });
  });
});