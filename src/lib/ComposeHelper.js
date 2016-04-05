import Shell from './ShellHelper';

export default class ComposeHelper {

  static build(options) {
    Shell.spawn('docker-compose', ['build'], options);
  }

  static rebuild(options) {
    Shell.spawn('docker-compose', ['build', '--force-rm', '--no-cache'], options);
  }

  static up(options) {
    Shell.spawn('docker-compose', ['up', '--force-recreate'], options);
  }

  static test(options) {
    Shell.spawn('docker-compose', ['-f', 'docker-compose.test.yml', 'up', '--force-recreate'], options);
  }

  static debug(options) {
    Shell.spawn('docker-compose', ['-f', 'docker-compose.debug.yml', 'up', '--force-recreate'], options);
  }

  static production(options) {
    Shell.spawn('docker-compose', ['-f', 'docker-compose.production.yml', 'up', '--force-recreate'], options);
  }
  
}
