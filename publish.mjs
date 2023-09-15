import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { execSync } from "child_process";

/**
 * Updates files with new version, creates a git tag and pushes to origin.
 *
 * Usage:
 * node publish.mjs 1.0.0
 * node publish.mjs 1.0.1
 * node publish.mjs 1.0.1-beta.1
 */

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
execResult = execSync("git status --porcelain=v1", { encoding: "utf8" });
if (execResult.length > 0) {
  throw new Error("Please commit all changes before publishing.");
}

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

execResult = execSync("git add -A", { encoding: "utf8" });
console.log(execResult);

execResult = execSync(`git commit -m "${version}"`, { encoding: "utf8" });
console.log(execResult);

execResult = execSync(`git tag v${version}`, { encoding: "utf8" });
console.log(execResult);

execResult = execSync(`git push --atomic origin master v${version}`, {
  encoding: "utf8",
});
console.log(execResult);
