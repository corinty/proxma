import arg from "arg";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import chalk from "chalk";
const conf = require("rc")("proxma", {
    injectPath: "./dist/inject/**/*",
});

import parseArgumentsIntoOptions from "./parseArguments";
import runGulp from "./main";

export async function cli(args) {
    try {
        if (!conf.config) {
            throw new Error("No .proxmarc file found");
        } else if (!conf.proxy) {
            throw new Error("No proxy set in the .proxmarc file");
        }

        // let options = parseArgumentsIntoOptions(args);
        // options = await promptForMissingOptions(options);

        await runGulp();
    } catch (error) {
        console.log("boughht to throw error");

        console.error(chalk.red(error));
    }
}
