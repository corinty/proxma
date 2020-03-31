import inquirer from "inquirer";
import fs from "fs";
import boxen from "boxen";
import chalk from "chalk";
import { validURL } from "./utils";

export async function initProxma() {
    console.clear();
    console.log(
        boxen(`🤔 ${chalk.greenBright("No .proxmarc file found...")}`, {
            padding: 1,
            borderStyle: "classic",
        })
    );
    await inquirer
        .prompt([
            {
                type: "confirm",
                name: "createRC",
                message: "Create one now?",
                default: true,
            },
        ])
        .then(res => {
            if (!res.createRC) {
                console.log(chalk.yellow("💀 - Exiting due to no '.proxmarc' file"));
                process.exit();
            }
        });
    console.clear();
    console.log("🤗 Let's get some info: \n");

    const questions = [
        {
            type: "input",
            name: "proxy",
            message: "Enter URL:",
            validate(input) {
                return validURL(input) || "Please provide valid URL";
            },
        },
        // {
        //     type: "confirm",
        //     name: "createFiles",
        //     message: "Create Starter Files?",
        //     default: true,
        // },
    ];

    const settings = await inquirer.prompt(questions);

    // Create .proxmarc file
    createFiles(settings);

    console.clear();
    console.log(
        boxen(
            `Now add files inside:\n \n${chalk.green(
                "- src/js \n- src/scss"
            )}\n\n🔥🔥Then rerun proxma! 🔥🔥`,
            {
                padding: 1,
                borderStyle: "classic",
            }
        )
    );

    process.exit();
}

function createFiles(settings) {
    console.log("creating files");

    fs.writeFileSync(".proxmarc", JSON.stringify(settings));
    fs.mkdirSync("./src/scss", { recursive: true });
    fs.mkdirSync("./src/js", { recursive: true });
}
