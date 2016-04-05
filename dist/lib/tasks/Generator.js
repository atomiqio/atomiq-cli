'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ShellHelper = require('../ShellHelper');

var _ShellHelper2 = _interopRequireDefault(_ShellHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, null, [{
    key: 'generate',
    value: function generate(source, dest, context) {
      var appDir = context.name;

      dest = _path2.default.join(dest, appDir);
      if (_ShellHelper2.default.exists(dest)) {
        // TODO: investigate babel bug? explicit string assignment since not interpolated as Error parameter
        var message = 'The target directory already exists (' + _path2.default.basename(dest) + ').';
        throw new Error(message);
      }

      Generator.render(source, dest, context);
    }
  }, {
    key: 'render',
    value: function render(source, dest, context) {
      _ShellHelper2.default.mkdir('-p', dest);
      var files = _fs2.default.readdirSync(source);
      files.forEach(function (f) {
        var srcpath = _path2.default.join(source, f);
        var stats = _fs2.default.statSync(srcpath);
        if (stats.isFile()) {
          // replace initial underscore (used to disable "special" file processing, .npmignore and .gitigore)
          f = f.replace(/^_(.*)$/, '.$1');
          var destpath = _path2.default.join(dest, f);
          var template = _fs2.default.readFileSync(srcpath, 'utf8');
          //let result = nunjucks.render(path.basename(srcpath), context);
          var result = _nunjucks2.default.renderString(template, context);
          _fs2.default.writeFileSync(destpath, result, 'utf8');
        } else if (stats.isDirectory()) {
          Generator.render(_path2.default.join(source, f), _path2.default.join(dest, f), context);
        }
      });
    }
  }]);

  return Generator;
}();

exports.default = Generator;
//# sourceMappingURL=Generator.js.map