import path from 'path';
import pkg from '../../package.json';
import semver from 'semver';
import Shell from './ShellHelper';

export default class Project {

  /** This tool must be run from the project root and to be a valid project, it must have a dependency on Atomiq */
  static throwInvalidProject() {
    throw new Error('This does not appear to be an Atomiq project. Make sure to run commands from the root of a package with a dependency on Atomiq.');
  }

  /** The project must be compatible with the version of Atomiq that this tool targets */
  static throwInvalidProjectVersion() {
    throw new Error('The project depends on a different version of Atomiq than this CLI supports.');
  }

  /** The version of Atomiq that this tool supports */
  static supportedVersion() {
    return pkg.atomiq.supportedVersion;
  }

  constructor() {
    this.projectRoot = process.cwd();
  }

  /**
   * For project related tasks that are supposed to be run at the root
   * of a project, this method verifies that the process cwd has a package.json
   * file with a dependency on the version of atomiq that this cli targets.
   *
   * @throws if not a valid project
   */
  checkValidProject() {
    let pathname = path.join(this.projectRoot, 'package.json');
    if (!Shell.exists(pathname)) {
      Project.throwInvalidProject();
    }

    let packageFile = require(pathname);
    if (!(packageFile.dependencies && packageFile.dependencies.atomiq)) {
      Project.throwInvalidProject();
    } else if (!semver.satisfies(Project.supportedVersion(), packageFile.dependencies.atomiq)) {
      Project.throwInvalidProjectVersion();
    }
  }
}
