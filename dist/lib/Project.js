'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _ShellHelper = require('./ShellHelper');

var _ShellHelper2 = _interopRequireDefault(_ShellHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Project = function () {
  _createClass(Project, null, [{
    key: 'throwInvalidProject',


    /** This tool must be run from the project root and to be a valid project, it must have a dependency on Atomiq */
    value: function throwInvalidProject() {
      throw new Error('This does not appear to be an Atomiq project. Make sure to run commands from the root of a package with a dependency on Atomiq.');
    }

    /** The project must be compatible with the version of Atomiq that this tool targets */

  }, {
    key: 'throwInvalidProjectVersion',
    value: function throwInvalidProjectVersion() {
      throw new Error('The project depends on a different version of Atomiq than this CLI supports.');
    }

    /** The version of Atomiq that this tool supports */

  }, {
    key: 'supportedVersion',
    value: function supportedVersion() {
      return _package2.default.atomiq.supportedVersion;
    }
  }]);

  function Project() {
    _classCallCheck(this, Project);

    this.projectRoot = process.cwd();
  }

  /**
   * For project related tasks that are supposed to be run at the root
   * of a project, this method verifies that the process cwd has a package.json
   * file with a dependency on the version of atomiq that this cli targets.
   *
   * @throws if not a valid project
   */


  _createClass(Project, [{
    key: 'checkValidProject',
    value: function checkValidProject() {
      var pathname = _path2.default.join(this.projectRoot, 'package.json');
      if (!_ShellHelper2.default.exists(pathname)) {
        Project.throwInvalidProject();
      }

      var packageFile = require(pathname);
      if (!(packageFile.dependencies && packageFile.dependencies.atomiq)) {
        Project.throwInvalidProject();
      } else if (!_semver2.default.satisfies(Project.supportedVersion(), packageFile.dependencies.atomiq)) {
        Project.throwInvalidProjectVersion();
      }
    }
  }]);

  return Project;
}();

exports.default = Project;
//# sourceMappingURL=Project.js.map