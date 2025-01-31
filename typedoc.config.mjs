/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
	entryPoints: ["src/index.ts"],
	out: "docs",
	plugin: ["typedoc-material-theme"],
	themeColor: "#f4b8da",
	tsconfig: "./tsconfig.json",
};

export default config;
