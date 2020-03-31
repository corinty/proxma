"use strict";

var glob = require("glob");

var path = require("path");

var QRCode = require("qrcode");

var browserSync = require("browser-sync").create();

var conf = require("rc")("proxma", {
  injectPath: "./dist/{js,css}/**/*.{js,css}",
  externalFiles: [],
  injectAtBottom: true
});

function proxmaServer() {
  browserSync.init({
    proxy: conf.proxy,
    open: false,
    logPrefix: "Proxma - BrowserSync",
    files: ["dist/**/*"],
    serveStatic: ["./"],
    snippetOptions: {
      rule: {
        match: conf.injectAtBottom ? /$/i : /<\/head>/i,
        fn: function fn(snippet, match) {
          return filesToAdd() + externalFiles() + snippet + match;
        }
      }
    },
    rewriteRules: filesToReplace()
  });
}

function externalFiles() {
  var externalFiles = conf.externalFiles;
  if (externalFiles.length === 0) return;
  return externalFiles.map(function (url) {
    return prepareLinks({
      url: url
    });
  }).join("");
}

function filesToAdd() {
  var files = glob.sync(conf.injectPath);
  if (files.length === 0) return;
  return files.map(function (filePath) {
    return prepareLinks({
      filePath: filePath
    });
  }).filter(function (file) {
    return file;
  }).join("");
}

function prepareLinks(_ref) {
  var filePath = _ref.filePath,
      url = _ref.url;
  var ext = path.extname(filePath || url).replace(".", "");

  switch (ext) {
    case "css":
      return "<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(url || filePath.replace(".", ""), "\"/>");

    case "js":
      return "<script type=\"text/javascript\" src=\"".concat(url || filePath.replace(".", ""), "\"></script>");

    default:
      return null;
  }
}

function filesToReplace() {
  var files = conf.replaceFiles;
  if (!files) return;
  return files.map(function (item) {
    var url = item.url,
        file = item.file;
    var path = url || item;
    var splitPath = path.split("/");
    var defaultFile = splitPath[splitPath.length - 1]; // ?

    /**
     * Remove the first / if it's a part of the url
     */

    if (path.charAt(0) === "/") {
      path = path.replace("/", "");
    }

    return {
      match: new RegExp(path),
      fn: function fn() {
        return "dist/replace/" + (file || defaultFile);
      }
    };
  });
}

module.exports = proxmaServer;