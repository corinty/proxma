"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseArgumentsIntoOptions;

var _arg = _interopRequireDefault(require("arg"));

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function parseArgumentsIntoOptions(rawArgs) {
  var args = (0, _arg["default"])({
    "--git": Boolean,
    "--yes": Boolean,
    "--install": Boolean,
    "-g": "--git",
    "-y": "--yes",
    "-i": "--install"
  }, {
    argv: rawArgs.slice(2)
  });
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false
  };
}

function promptForMissingOptions(_x) {
  return _promptForMissingOptions.apply(this, arguments);
}

function _promptForMissingOptions() {
  _promptForMissingOptions = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options) {
    var defaultTemplate, questions, answers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            defaultTemplate = "JavaScript";

            if (!options.skipPrompts) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", _objectSpread({}, options, {
              template: options.template || defaultTemplate
            }));

          case 3:
            questions = [];

            if (!options.template) {
              questions.push({
                type: "list",
                name: "template",
                message: "Please choose which project template to use",
                choices: ["JavaScript", "TypeScript"],
                "default": defaultTemplate
              });
            }

            if (!options.git) {
              questions.push({
                type: "confirm",
                name: "git",
                message: "Initialize a git repository?",
                "default": false
              });
            }

            _context.next = 8;
            return _inquirer["default"].prompt(questions);

          case 8:
            answers = _context.sent;
            return _context.abrupt("return", _objectSpread({}, options, {
              template: options.template || answers.template,
              git: options.git || answers.git
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _promptForMissingOptions.apply(this, arguments);
}