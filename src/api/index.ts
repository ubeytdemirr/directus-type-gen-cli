import type { Collections, Field } from "../types";
import {
	Collection as DirectusCollection,
	Relation,
} from "@directus/shared/types";
import type { AxiosResponse } from "axios";

import axios from "axios";

import { chalkLogger } from "../utils/logger";

const logger = chalkLogger();

const { DIRECTUS_URL, DIRECTUS_TOKEN } = process.env;

const api = axios.create({
	baseURL: DIRECTUS_URL,
	headers: {
		Authorization: `Bearer ${DIRECTUS_TOKEN}`,
	},
});
export async function getCollections() {
	const collectionsRes: AxiosResponse<{ data: DirectusCollection[] }> =
		await api.get("/collections?limit=-1");
	const rawCollections = collectionsRes.data.data;
	const collections: Collections = {};
	rawCollections.forEach(
		(collection) =>
			(collections[collection.collection] = { ...collection, fields: [] }),
	);
	const fieldsRes: AxiosResponse<{ data: Field[] }> = await api.get(
		"/fields?limit=-1",
	);
	const fields = fieldsRes.data.data;
	fields.forEach((field) => {
		if (!collections[field.collection]) {
			logger.warn(`${field.collection} not found`);
			return;
		}
		collections[field.collection].fields.push(field);
	});
	const relationsRes: AxiosResponse<{ data: Relation[] }> = await api.get(
		"/relations?limit=-1",
	);
	const relations = relationsRes.data.data;
	relations.forEach((relation) => {
		const oneField = collections[relation.meta?.one_collection!]?.fields.find(
			(field) => field.field === relation.meta?.one_field,
		);
		const manyField = collections[relation.meta?.many_collection!]?.fields.find(
			(field) => field.field === relation.meta?.many_field,
		);
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
	return collections;
}
