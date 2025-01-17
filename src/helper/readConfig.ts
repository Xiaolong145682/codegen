import Ajv from "ajv";
import chalk from "chalk";
import config, { addToConfig, Config } from "../config";
import readExtraConfig from "../util/readExtraConfig";

const configSchema = {
	type: "object",
	properties: {
		iconRoot: { type: "string" },
		iconTarget: { type: "string" },
		templateFile: { type: "string" },
	},
	additionalProperties: false,
};

const ajv = new Ajv();
const iconConfigValidate = ajv.compile(configSchema);

const codegenConfigPath = "./.codegen/config.json";

export default function readConfig() {
	const codegenConfig = readExtraConfig(codegenConfigPath);
	if (iconConfigValidate(codegenConfig)) {
		return addToConfig(codegenConfig as Config);
	} else {
		console.log(
			chalk.red(`🔥 配置项错误 `),
			JSON.stringify(iconConfigValidate.errors)
		);
	}
	return config;
}
