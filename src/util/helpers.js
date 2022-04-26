import chalk from "chalk";

export const pad = (
  start,
  end,
  config = {
    width: 50,
    char: ".",
  },
) => {
  const padding = new Array(config.width - (start.length + end.length))
    .fill(config.char)
    .join("");

  return [start, chalk.dim(padding), end].join(" ");
};
