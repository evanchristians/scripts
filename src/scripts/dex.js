const inquirer = require("inquirer");
const cp = require("node:child_process");
const c = require("chalk");

cp.exec("docker ps --format '{{.Names}}'", async (error, stdout) => {
  if (error) {
    console.error(error.message);
    return;
  }

  const containers = stdout.split(/\n/).filter(s => s.length);

  if (!containers.length) {
    console.error(c.red("no running containers."));
    return;
  }

  console.log("\n Please select a container to exec onto \n");

  try {
    const selection = await inquirer.prompt([
      {
        name: "container",
        type: "list",
        choices: containers.map(container => ({
          name: `• ${container}`,
          value: container,
        })),
      },
    ]);
    if (selection?.container) {
      cp.spawnSync("docker", ["exec", "-ti", selection.container, "bash"], {
        stdio: "inherit",
      });
    }
  } catch (e) {
    console.log(e);
  }
});
