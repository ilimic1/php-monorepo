import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { execSync } from "child_process";
import { exit } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const semverPattern =
  "(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?";

function validateVersion(version) {
  if (typeof version !== "string" || version.length === 0) {
    throw new Error("Version is required");
  }

  if (!new RegExp(`^${semverPattern}$`).test(version)) {
    throw new Error("Invalid version");
  }
}

const [, , version] = process.argv;

validateVersion(version);

let execResult = null;
execResult = execSync("git status --porcelain=v1");
console.log('git status --porcelain=v1', execResult.toString("utf8"));

exit(0);

const files = [
  "wordpress-plugin-1/plugin.php",
  "wordpress-plugin-2/plugin.php",
  "wordpress-plugin-3/plugin.php",
];

files.forEach((file) => {
  const data = fs.readFileSync(`${__dirname}/${file}`, "utf8");

  fs.writeFileSync(
    file,
    data.replace(
      new RegExp(`^Version: ${semverPattern}$`, "m"),
      `Version: ${version}`
    ),
    {
      encoding: "utf8",
    }
  );
});

// execResult = execSync("git add -A");
// console.log(execResult.toString("utf8"));

// execResult = execSync(`git commit -m "${version}"`);
// console.log(execResult.toString("utf8"));

// execResult = execSync(`git tag v${version}`);
// console.log(execResult.toString("utf8"));

// execResult = execSync(`git push --atomic origin master v${version}`);
// console.log(execResult.toString("utf8"));
