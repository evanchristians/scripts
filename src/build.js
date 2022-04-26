import fs from "fs";
import chalk from "chalk";
import {promisify} from "util";
import cp from "child_process";
import {pad} from "./util/helpers.js";

const exec = promisify(cp.exec);
const {stdout} = process;

const build = async () => {
  const files = fs.readdirSync("./src/scripts");

  for (const file of files) {
    try {
      stdout.write(pad(file, chalk.yellow("building")));
      await exec(
        `pkg ./src/scripts/${file} -o ./bin/${file.replace(/.js/, "")}`,
      );
      stdout.clearLine();
      stdout.cursorTo(0);
      stdout.write(pad(file, chalk.green("ok")) + "\n");
    } catch (err) {
      console.error(err);
    }
  }
};

build();
