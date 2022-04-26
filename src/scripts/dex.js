const inquirer = require("inquirer");
const cp = require("node:child_process");

cp.exec("docker ps --format '{{.Names}}'", async (error, stdout) => {
  if (error) {
    console.error(error.message);
    return;
  }

  const containers = stdout.split(/\n/).filter(s => s.length);

  const selection = await inquirer.prompt([
    {
      name: "container",
      type: "list",
      choices: containers.map(container => ({
        name: container,
        value: container,
      })),
    },
  ]);

  if (selection.container) {
    cp.spawnSync("docker", ["exec", "-ti", selection.container, "bash"], {
      stdio: "inherit",
    });
  }
});
