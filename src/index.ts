#!/usr/bin/env node

import { Directus } from "./utils/api";
import argv from "argv";
import { chalkLogger } from "./utils/logger";
const logger = chalkLogger();

const main = async () => {
	const args = argv.option([
		{
			name: "directusURL",
			short: "u",
			type: "string",
		},
		{
			name: "directusToken",
			short: "t",
			type: "string",
		},
	]).run();

	const [directusURL, directusToken ] = args.targets;
	if (!directusURL) {
		logger.error("❌ directusURL is required (-u) ");
		return process.exit(1);
	}
	if (!directusToken) {
		logger.error("❌ directusToken is required (-t)");
	}
	const directus = new Directus(directusURL, directusToken);
	await directus.testToken();
	const types = await directus.generateFile();
	logger.info("✅ Done");
};

main();

 