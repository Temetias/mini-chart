const path = require("path");

module.exports = {
	entry: "./ts_src/instance/api.ts",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [ ".tsx", ".ts", ".js" ]
	},
	output: {
		filename: "minichart.js",
		path: path.resolve(__dirname, "build"),
		libraryExport: "default",
		libraryTarget: "var",
		library: "MiniChart"
	}
};
