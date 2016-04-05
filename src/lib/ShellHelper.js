import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import shell from 'shelljs';

export default class ShellHelper {

  static exec(...args) {
    return execSync(...args);
  }

  static spawn(...args) {
    spawnSync(...args);
  }

  static exists(pathname) {
    try {
      fs.accessSync(pathname, fs.R_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  static copyDir(source, dest, options = { recurse: true }, filter) {
    shell.mkdir('-p', dest);
    let files = fs.readdirSync(source).filter(filter);
    files.forEach(f => {
      let srcpath = path.join(source, f);
      let stats = fs.statSync(srcpath);
      if (stats.isFile()) {
        let destpath = path.join(dest, f);
        shell.cp(srcpath, destpath);
      } else if (stats.isDirectory() && options.recurse) {
        ShellHelper.copyDir(path.join(source, f), path.join(dest, f), options, filter);
      }

    });
  }

  static mkdir(...args) {
    shell.mkdir(...args);
  }

  static cp(...args) {
    shell.cp(...args);
  }

  static rm(...args) {
    shell.rm(...args);
  }
}
