import {Type} from "@tsed/core";
import { JsonEntityStore, JsonSchemaOptions, SpecTypes } from '@tsed/schema';
import { serializeJsonSchema } from './lib';

const CACHE_KEY = "$cache:schemes";

const getKey = (options: any) => {
	return JSON.stringify(options);
}

const get = (entity: JsonEntityStore, options: any) => {
	const cache: Map<string, any> = entity.store.get(CACHE_KEY) || new Map();
	const key = getKey(options);

	if (!cache.has(key)) {
		const schema = serializeJsonSchema(entity.schema, options);

		if (Object.keys(options.schemas).length) {
			schema.definitions = options.schemas;
		}

		cache.set(key, schema);
	}

	entity.store.set(CACHE_KEY, cache);

	return cache.get(key);
}

export const getJsonSchemaCustom = (model: Type<any> |
	JsonEntityStore, options: JsonSchemaOptions = {}) => {
	options = {
		endpoint: true,
		groups: [],
		...options,
		specType: options.specType || SpecTypes.JSON,
		schemas: {}
	};

	const entity = model instanceof JsonEntityStore ? model : JsonEntityStore.from(model);

	return get(entity, options);
}
