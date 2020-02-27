const glob = require("glob");
const path = require("path");
const QRCode = require("qrcode");
const browserSync = require("browser-sync").create();
const conf = require("rc")("proxma", {
    injectPath: "./dist/inject/**/*",
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
                    return filesToInject() + externalInject() + snippet + match;
                },
            },
        },
        rewriteRules: filesToReplace(),
        callbacks: {
            /**
             * This 'ready' callback can be used
             * to access the Browsersync instance
             */
            ready: function(err, bs) {
                // example of accessing URLS
                // const local = bs.options.get("urls").get("external");
                // TODO:: Add showing url for external link
                // QRCode.toCanvas(local, { type: "terminal", width: 20 }, function(err, url) {
                //     console.log(url);
                // });
            },
        },
    });
}

function externalInject() {
    const { externalFiles } = conf;
    if (externalFiles.length === 0) return;
    return externalFiles.map(url => prepareLinks({ url })).join("");
}

function filesToInject() {
    const files = glob.sync(conf.injectPath);

    if (files.length === 0) return;
    return files
        .map(filePath => prepareLinks({ filePath }))
        .filter(file => file)
        .join("");
}
function prepareLinks({ filePath, url }) {
    const ext = path.extname(filePath || url).replace(".", "");
    const name = path.basename(filePath || url).replace(`.${ext}`, "");

    switch (ext) {
        case "scss":
        case "css":
            return `<link rel="stylesheet" type="text/css" href="${
                url ? url : `/dist/inject/${name}.css`
            }"/>`;
        case "js":
            return `<script type="text/javascript" src="${
                url ? url : `/dist/inject/${name}.js`
            }"></script>`;
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
