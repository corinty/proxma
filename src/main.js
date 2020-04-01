import path from "path";
import fs from "fs";
import { watch } from "chokidar";
import chalk from "chalk";
import boxen from "boxen";
const { spawn, exec } = require("child_process");
const conf = require("rc")("proxma");
export async function main(options) {
    const resolveApp = relativePath => path.resolve(pkgRoot, relativePath);
    const currentDir = process.cwd();
    try {
        alertBox("🔥🔥 Starting Proxma 🔥🔥");
        let gulpProcess = runGulp();
        // One-liner for current directory

        watch(currentDir + "/src/**/*", { ignoreInitial: true }).on("add", event => {
            alertBox("New file found.\n\n 🔥🔥 Restarting Proxma 🔥🔥");
            gulpProcess = restartGulp(gulpProcess);
        });

        watch(currentDir + "/.proxmarc", { ignoreInitial: true }).on("change", () => {
            alertBox(".proxmarc changed\n\n 🔥🔥 Restarting Proxma 🔥🔥");

            gulpProcess = restartGulp(gulpProcess);
        });
    } catch (error) {
        throw error;
    }
}
function runGulp() {
    const pkgRoot = path.join(__dirname, "../");
    const gulpPath = path.join(pkgRoot, "./node_modules/.bin/gulp");
    const gulpFilePath = path.join(__dirname, "../gulpfile.js");

    return spawn(gulpPath, ["--cwd", path.join(process.cwd()), "-f", gulpFilePath, "--color"], {
        stdio: "inherit",
        shell: process.platform === "win32",
    }).on("error", err => {
        throw err;
    });
}

function restartGulp(curGulpProcess) {
    const isWin = /^win/.test(process.platform);
    if (!isWin) {
        curGulpProcess.kill();
    } else {
        exec("taskkill /PID " + curGulpProcess.pid + " /T /F");
    }
    return runGulp();
}

function alertBox(msg) {
    console.clear();
    console.log(
        boxen(chalk.yellowBright(msg), {
            padding: 1,
            borderStyle: "classic",
        }),
        "\n"
    );
}
