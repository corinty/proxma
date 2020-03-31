const glob = require("glob");
const path = require("path");
const QRCode = require("qrcode");
const browserSync = require("browser-sync").create();
const conf = require("rc")("proxma", {
    injectPath: "./dist/{js,css}/**/*.{js,css}",
    externalFiles: [],
    injectAtBottom: true,
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
                fn(snippet, match) {
                    return filesToAdd() + externalFiles() + snippet + match;
                },
            },
        },
        rewriteRules: filesToReplace(),
    });
}

function externalFiles() {
    const { externalFiles } = conf;
    if (externalFiles.length === 0) return;
    return externalFiles.map(url => prepareLinks({ url })).join("");
}

function filesToAdd() {
    const files = glob.sync(conf.injectPath);

    if (files.length === 0) return;
    return files
        .map(filePath => prepareLinks({ filePath }))
        .filter(file => file)
        .join("");
}
function prepareLinks({ filePath, url }) {
    const ext = path.extname(filePath || url).replace(".", "");

    switch (ext) {
        case "css":
            return `<link rel="stylesheet" type="text/css" href="${url ||
                filePath.replace(".", "")}"/>`;
        case "js":
            return `<script type="text/javascript" src="${url ||
                filePath.replace(".", "")}"></script>`;
        default:
            return null;
    }
}

function filesToReplace() {
    const files = conf.replaceFiles;
    if (!files) return;
    return files.map(item => {
        const { url, file } = item;

        let path = url || item;

        const splitPath = path.split("/");
        const defaultFile = splitPath[splitPath.length - 1]; // ?
        /**
         * Remove the first / if it's a part of the url
         */
        if (path.charAt(0) === "/") {
            path = path.replace("/", "");
        }

        return {
            match: new RegExp(path),
            fn() {
                return "dist/replace/" + (file || defaultFile);
            },
        };
    });
}

module.exports = proxmaServer;
