'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _babelPresetEs = require('babel-preset-es2015');

var _babelPresetEs2 = _interopRequireDefault(_babelPresetEs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ShellHelper = require('./ShellHelper');

var _ShellHelper2 = _interopRequireDefault(_ShellHelper);

var _babelPluginSyntaxAsyncFunctions = require('babel-plugin-syntax-async-functions');

var _babelPluginSyntaxAsyncFunctions2 = _interopRequireDefault(_babelPluginSyntaxAsyncFunctions);

var _babelCore = require('babel-core');

var _babelPluginTransformRegenerator = require('babel-plugin-transform-regenerator');

var _babelPluginTransformRegenerator2 = _interopRequireDefault(_babelPluginTransformRegenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  sourceMaps: true,
  presets: [_babelPresetEs2.default],
  plugins: [_babelPluginSyntaxAsyncFunctions2.default, _babelPluginTransformRegenerator2.default]
};

var BabelHelper = function () {
  function BabelHelper() {
    _classCallCheck(this, BabelHelper);
  }

  _createClass(BabelHelper, null, [{
    key: 'transform',
    value: function transform(source, dest, options) {
      _ShellHelper2.default.mkdir('-p', dest);
      var filter = function filter(f) {
        return _path2.default.extname(f) == '.js';
      };
      var files = _fs2.default.readdirSync(source);
      files.forEach(function (f) {
        var srcpath = _path2.default.join(source, f);
        var stats = _fs2.default.statSync(srcpath);
        if (stats.isFile() && filter(f)) {
          var destpath = _path2.default.join(dest, f);
          var sourcemap = destpath + '.map';
          var result = (0, _babelCore.transformFileSync)(srcpath, options || defaultOptions);
          _fs2.default.writeFileSync(destpath, result.code, 'utf8');
          _fs2.default.writeFileSync(sourcemap, JSON.stringify(result.map), 'utf8');
        } else if (stats.isDirectory()) {
          BabelHelper.transform(_path2.default.join(source, f), _path2.default.join(dest, f), options);
        }
      });
    }
  }]);

  return BabelHelper;
}();

exports.default = BabelHelper;
//# sourceMappingURL=BabelHelper.js.map