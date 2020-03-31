import arg from "arg";
import inquirer from "inquirer";
import path from "path";
import fs, { exists } from "fs";
import chalk from "chalk";
import boxen from "boxen";

import parseArgumentsIntoOptions from "./parseArguments";
import { validURL } from "./utils";
import { main } from "./main";
import { initProxma } from "./initProxma";
const conf = require("rc")("proxma", {
    injectPath: "./dist/inject/**/*",
});

export async function cli(args) {
    try {
        // Check for .proxmarc
        if (!conf.config) {
            await initProxma();
        }

        await main();
    } catch (error) {
        console.error(chalk.red(error));
    }
}
