#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

try {
	process.chdir(path.dirname(__filename) + "/..");

	if (fs.existsSync("dist")) {
		fs.rmSync("dist", { recursive: true, force: true });
	}
	fs.mkdirSync("dist");

	// Compile
	execSync("npm exec tsc-multi", { stdio: "inherit" });

	// Post-compile
	fs.copyFileSync("dist/index.d.ts", "dist/index.d.mts");

	execSync("node -e 'require(\"@xct007/sdwebui-api-client\")'", {
		cwd: "dist",
		stdio: "inherit",
	});
	execSync(
		"node -e 'import(\"@xct007/sdwebui-api-client\")' --input-type=module",
		{
			cwd: "dist",
			stdio: "inherit",
		}
	);
} catch (_error) {
	process.exit(1);
}
