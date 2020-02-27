import execa from "execa";
import path from "path";
import fs from "fs";
const { spawn } = require("child_process");

export default async function runGulp(options) {
    const pkgRoot = path.join(__dirname, "../");
    const resolveApp = relativePath => path.resolve(pkgRoot, relativePath);

    const current = process.cwd();
    const gulpPath = path.join(pkgRoot, "./node_modules/.bin/gulp");
    const gulpFilePath = path.join(__dirname, "../gulpfile.js");
    try {
        // const result = await execa("unknown", ["command"]);
        // const result = execa(
        //     gulpPath,
        //     ["--cwd", path.join(process.cwd()), "-f", gulpFilePath, "--color"],
        //     {
        //         // cwd: options.targetDirectory,
        //     }
        // ).stdout.pipe(process.stdout);

        const ls = spawn(
            gulpPath,
            ["--cwd", path.join(process.cwd()), "-f", gulpFilePath, "--color"],
            { stdio: "inherit" }
        );

        return true;
    } catch (error) {
        throw error;
    }
}
