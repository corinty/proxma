"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initProxma = initProxma;

var _inquirer = _interopRequireDefault(require("inquirer"));

var _fs = _interopRequireDefault(require("fs"));

var _boxen = _interopRequireDefault(require("boxen"));

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initProxma() {
  return _initProxma.apply(this, arguments);
}

function _initProxma() {
  _initProxma = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var questions, settings;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.clear();
            console.log((0, _boxen["default"])("\uD83E\uDD14 ".concat(_chalk["default"].greenBright("No .proxmarc file found...")), {
              padding: 1,
              borderStyle: "classic"
            }));
            _context.next = 4;
            return _inquirer["default"].prompt([{
              type: "confirm",
              name: "createRC",
              message: "Create one now?",
              "default": true
            }]).then(function (res) {
              if (!res.createRC) {
                console.log(_chalk["default"].yellow("💀 - Exiting due to no '.proxmarc' file"));
                process.exit();
              }
            });

          case 4:
            console.clear();
            console.log("🤗 Let's get some info: \n");
            questions = [{
              type: "input",
              name: "proxy",
              message: "Enter URL:",
              validate: function validate(input) {
                return (0, _utils.validURL)(input) || "Please provide valid URL";
              }
            } // {
            //     type: "confirm",
            //     name: "createFiles",
            //     message: "Create Starter Files?",
            //     default: true,
            // },
            ];
            _context.next = 9;
            return _inquirer["default"].prompt(questions);

          case 9:
            settings = _context.sent;
            // Create .proxmarc file
            createFiles(settings);
            console.clear();
            console.log((0, _boxen["default"])("Now add files inside:\n \n".concat(_chalk["default"].green("- src/js \n- src/scss"), "\n\n\uD83D\uDD25\uD83D\uDD25Then rerun proxma! \uD83D\uDD25\uD83D\uDD25"), {
              padding: 1,
              borderStyle: "classic"
            }));
            process.exit();

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initProxma.apply(this, arguments);
}

function createFiles(settings) {
  _fs["default"].writeFileSync(".proxmarc", JSON.stringify(settings));

  _fs["default"].mkdirSync("./src/scss", {
    recursive: true
  });

  _fs["default"].mkdirSync("./src/js", {
    recursive: true
  });
}