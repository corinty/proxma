import execa from "execa";
import path from "path";
import fs from "fs";
import chokidar from "chokidar";
import chalk from "chalk";
import boxen from "boxen";
const { spawn, exec } = require("child_process");
const conf = require("rc")("proxma");
export async function main(options) {
    const resolveApp = relativePath => path.resolve(pkgRoot, relativePath);
    const current = process.cwd();
    try {
        console.clear();
        console.log(
            `\n${boxen(chalk.yellowBright("🔥🔥 Starting Proxma 🔥🔥"), {
                padding: 1,
                borderStyle: "classic",
            })}\n`
        );
        let gulpProcess = runGulp();
        // One-liner for current directory
        const watcher = chokidar
            .watch(process.cwd() + "/src/**/*", { ignoreInitial: true })
            .on("add", event => {
                console.clear();
                console.log(
                    boxen(chalk.yellowBright("New file found.\n\n 🔥🔥 Restarting Proxma 🔥🔥"), {
                        padding: 1,
                        borderStyle: "classic",
                    }),
                    "\n"
                );
                // gulpProcess.kill();
                var isWin = /^win/.test(process.platform);
                if (!isWin) {
                    gulpProcess.kill();
                } else {
                    exec("taskkill /PID " + gulpProcess.pid + " /T /F");
                }
                gulpProcess = runGulp();
            });
    } catch (error) {
        throw error;
    }
}
function runGulp() {
    const pkgRoot = path.join(__dirname, "../");
    const gulpPath = path.join(pkgRoot, "./node_modules/.bin/gulp");
    const gulpFilePath = path.join(__dirname, "../gulpfile.js");
    // console.log(gulpPath);
    // spawn(gulpPath);
    // return;
    return spawn(gulpPath, ["--cwd", path.join(process.cwd()), "-f", gulpFilePath, "--color"], {
        stdio: "inherit",
        shell: process.platform === "win32",
    }).on("error", err => {
        throw err;
    });
}
