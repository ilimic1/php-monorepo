import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { execSync } from "child_process";

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

console.log(process.argv);

validateVersion(version);

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

let result = null;

result = execSync("git status");
console.log(result.toString("utf8"));

// result = execSync("git add -A");
// console.log(result.toString("utf8"));

// result = execSync(`git commit -m "${version}"`);
// console.log(result.toString("utf8"));

// result = execSync(`git tag v${version}`);
// console.log(result.toString("utf8"));

// result = execSync(`git push --atomic origin master v${version}`);
// console.log(result.toString("utf8"));
