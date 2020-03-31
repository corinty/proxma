"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runGulp = runGulp;

var _execa = _interopRequireDefault(require("execa"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _chokidar = _interopRequireDefault(require("chokidar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require("child_process"),
    spawn = _require.spawn;

var conf = require("rc")("proxma");

function runGulp(_x) {
  return _runGulp.apply(this, arguments);
}

function _runGulp() {
  _runGulp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options) {
    var pkgRoot, resolveApp, current, gulpPath, gulpFilePath, gulpProcess, watchr;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pkgRoot = _path["default"].join(__dirname, "../");

            resolveApp = function resolveApp(relativePath) {
              return _path["default"].resolve(pkgRoot, relativePath);
            };

            current = process.cwd();
            gulpPath = _path["default"].join(pkgRoot, "./node_modules/.bin/gulp");
            gulpFilePath = _path["default"].join(__dirname, "../gulpfile.js");
            _context.prev = 5;
            gulpProcess = spawn(gulpPath, ["--cwd", _path["default"].join(process.cwd()), "-f", gulpFilePath, "--color"], {
              stdio: "inherit"
            });
            console.log(process.cwd()); // One-liner for current directory

            watchr = _chokidar["default"].watch(".").on("all", function (event, path) {// console.log(event, path);
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](5);
            throw _context.t0;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 11]]);
  }));
  return _runGulp.apply(this, arguments);
}