import axios, { Axios } from "axios";
import { chalkLogger } from "./logger";
import { Collections, Field } from "../types";
import fs from "fs";
const logger = chalkLogger();

function pascalCase(str: string) {
	return str
		.split(" ")
		.flatMap((x) => x.split("_"))
		.flatMap((y) => y.split("-"))
		.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
		.join("");
}

function getType(field: Field, useIntersectionTypes = false) {
	let type: string;
	if (["integer", "bigInteger", "float", "decimal"].includes(field.type)) {
		type = "number";
	} else if (["boolean"].includes(field.type)) {
		type = "boolean";
	} else if (["json", "csv"].includes(field.type)) {
		type = "unknown";
	} else {
		type = "string";
	}
	if (field.relation) {
		type += ` ${useIntersectionTypes ? "&" : "|"} ${
			field.relation.collection ? pascalCase(field.relation.collection) : "any"
		}${field.relation.type === "many" ? "[]" : ""}`;
	}
	return type;
}
export class Directus {
	private api: Axios;
	collectionsMap: Collections = {};
	constructor(baseURL: string, token: string) {
		if (!baseURL) {
			throw new Error("baseURL is required");
		}
		if (!token) {
			throw new Error("token is required");
		}
		this.api = axios.create({
			baseURL,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}
	async testToken() {
		try {
			const { data } = await this.api.get("/users/me");
			logger.info(`✅ Token is valid for user ${data.data.email}`);
			return data.data;
		} catch (error) {
			logger.error("❌ Token is invalid");
			process.exit(1);
		}
	}
	getCollections = async () => {
		const { data } = await this.api.get("/collections?limit=-1");
		return data.data;
	};
	prepareCollections = async () => {
		const collections = await this.getCollections();
		this.collectionsMap = collections.reduce((acc, collection) => {
			acc[collection.collection] = {
				...collection,
				fields: [],
			};
			return acc;
		}, {});
	};
	checkFields = async () => {
		const fields = await this.getFields();
		fields.forEach((field) => {
			if (!this.collectionsMap[field.collection]) {
				logger.warn(`⚠️ ${field.collection} is not found`);
				return;
			}
			this.collectionsMap[field.collection].fields.push(field);
		});
	};
	async getFields() {
		const { data } = await this.api.get("/fields?limit=-1");
		return data.data;
	}
	async getRelations() {
		const { data } = await this.api.get("/relations?limit=-1");
		return data.data;
	}
	async collections() {
		await this.prepareCollections();
		await this.checkFields();
		const relations = await this.getRelations();
		relations.forEach((relation) => {
			const oneField = this.collectionsMap[
				relation.meta?.one_collection!
			]?.fields.find((field) => field.field === relation.meta?.one_field);
			const manyField = this.collectionsMap[
				relation.meta?.many_collection!
			]?.fields.find((field) => field.field === relation.meta?.many_field);
			if (oneField) {
				oneField.relation = {
					type: "many",
					collection: relation.meta?.many_collection!,
				};
			}
			if (manyField) {
				manyField.relation = {
					type: "one",
					collection: relation.meta?.one_collection!,
				};
			}
		});
		return this.collectionsMap;
	}
	async generate(useIntersectionTypes = false) {
		const collections = await this.collections();
		let ret = "";
		const types: any = [];
		Object.values(collections).forEach((collection) => {
			const collectionName = collection.collection;
			const typeName = pascalCase(collectionName);
			types.push(`${collectionName}: ${typeName}`);
			ret += `export type ${typeName} = {\n`;
			collection.fields.forEach((field) => {
				if (field.meta?.interface?.startsWith("presentation-")) {
					return;
				}
				ret += `  ${
					field.field.includes("-") ? `"${field.field}"` : field.field
				}${field.schema?.is_nullable ? "?" : ""}: ${getType(
					field,
					useIntersectionTypes,
				)};\n`;
			});
			ret += "};\n\n";
		});

		ret +=
			"export type DirectusTypes = {\n" +
			types.map((x: string) => `  ${x};`).join("\n") +
			"\n};";

		ret += "\n";

		return ret;
	}
	async generateFile(path = "./directus-types.ts") {
		logger.info("🚀 Generating types...");
		const types = await this.generate(false);
		logger.info("🚀 Writing types to file...");
		fs.writeFileSync(path, types);
		return types;
	}
}
