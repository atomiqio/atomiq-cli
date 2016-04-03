'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShellHelper = function () {
  function ShellHelper() {
    _classCallCheck(this, ShellHelper);
  }

  _createClass(ShellHelper, null, [{
    key: 'exec',
    value: function exec() {
      _child_process.execSync.apply(undefined, arguments);
    }
  }, {
    key: 'spawn',
    value: function spawn() {
      _child_process.spawnSync.apply(undefined, arguments);
    }
  }, {
    key: 'exists',
    value: function exists(pathname) {
      try {
        _fs2.default.accessSync(pathname, _fs2.default.R_OK);
        return true;
      } catch (err) {
        return false;
      }
    }
  }, {
    key: 'copyDir',
    value: function copyDir(source, dest) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? { recurse: true } : arguments[2];
      var filter = arguments[3];

      _shelljs2.default.mkdir('-p', dest);
      var files = _fs2.default.readdirSync(source).filter(filter);
      files.forEach(function (f) {
        var srcpath = _path2.default.join(source, f);
        var stats = _fs2.default.statSync(srcpath);
        if (stats.isFile()) {
          var destpath = _path2.default.join(dest, f);
          _shelljs2.default.cp(srcpath, destpath);
        } else if (stats.isDirectory() && options.recurse) {
          ShellHelper.copyDir(_path2.default.join(source, f), _path2.default.join(dest, f), options, filter);
        }
      });
    }
  }, {
    key: 'mkdir',
    value: function mkdir() {
      _shelljs2.default.mkdir.apply(_shelljs2.default, arguments);
    }
  }, {
    key: 'cp',
    value: function cp() {
      _shelljs2.default.cp.apply(_shelljs2.default, arguments);
    }
  }, {
    key: 'rm',
    value: function rm() {
      _shelljs2.default.rm.apply(_shelljs2.default, arguments);
    }
  }]);

  return ShellHelper;
}();

exports.default = ShellHelper;
//# sourceMappingURL=ShellHelper.js.map