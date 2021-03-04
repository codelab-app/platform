import { isArray, isObject, cleanObject } from "@tsed/core";
import { alterIgnore, JsonSchema, JsonSchemaOptions, mapGenericsOptions, popGenerics, SpecTypes } from '@tsed/schema';
import { mapAliasedProperties } from '@tsed/schema/lib/domain/JsonAliasMap';
import {
	serializeGenerics,
	serializeInherited
} from '@tsed/schema/lib/utils/serializeJsonSchema';
import { getRequiredProperties } from '@tsed/schema/lib/utils/getRequiredProperties';
import { getJsonEntityStore } from '@tsed/schema/lib/utils/getJsonEntityStore';
import { createRef, createRefName } from '@tsed/schema/lib/utils/createRef';

const IGNORES = ["name", "$required", "$hooks", "_nestedGenerics", SpecTypes.OPENAPI, SpecTypes.SWAGGER, SpecTypes.JSON];
const IGNORES_OPENSPEC = ["const"];
const IGNORES_OS2 = [, "writeOnly", "readOnly"];

const shouldSkipKey = (key: string, {specType = SpecTypes.JSON, customKeys = false}: JsonSchemaOptions) => {
	return (
		IGNORES.includes(key) ||
		(key.startsWith("#") && (customKeys === false || specType !== SpecTypes.JSON)) ||
		(specType === SpecTypes.SWAGGER && IGNORES_OS2.includes(key)) ||
		(specType !== SpecTypes.JSON && IGNORES_OPENSPEC.includes(key))
	);
}

const isEmptyProperties = (key: string, value: any) => {
	return typeof value === "object" && ["items", "properties", "additionalProperties"].includes(key) && Object.keys(value).length === 0;
}

const shouldMapAlias = (key: string, value: any, useAlias: boolean) => {
	return typeof value === "object" && useAlias && ["properties", "additionalProperties"].includes(key);
}

const transformTypes = (obj: any) => {
	const nullable = obj.type.includes("null") ? true : undefined;

	const types = obj.type.reduce((types: string[], type: string) => {
		if (type !== "null") {
			return [...types, cleanObject({type, nullable})];
		}
		return types;
	}, []);

	if (types.length > 1) {
		obj.oneOf = types;
	} else {
		obj.type = types[0].type;
		obj.nullable = types[0].nullable;
	}

	return obj;
}

export function serializeItem(value: any, options: JsonSchemaOptions) {
	// return value && value.isClass ? serializeClass(value, options) : serializeAny(value, options);
	return serializeAny(value, options);
}

export function serializeMap(input: Map<string, any>, options: JsonSchemaOptions = {}): any {
	options = mapGenericsOptions(options);

	return Array.from(input.entries()).reduce((obj: any, [key, value]) => {
		obj[key] = serializeItem(value, options);

		return obj;
	}, {});
}

export function serializeObject(input: any, options: JsonSchemaOptions) {
	const {specType, operationIdFormatter, root, schemas, genericTypes, nestedGenerics, useAlias, genericLabels, ...ctx} = options;

	return Object.entries(input).reduce<any>(
		(obj, [key, value]: any[]) => {
			if (options.withIgnoredProps !== false && !alterIgnore(value, ctx)) {
				obj[key] = serializeItem(value, options);
			}

			return obj;
		},
		isArray(input) ? [] : {}
	);
}

const serializeAny = (input: any, options: JsonSchemaOptions = {}) => {
	options.schemas = options.schemas || {};

	if (typeof input !== "object" || input === null) {
		return input;
	}

	if ("toJSON" in input) {
		const schema = input.toJSON(mapGenericsOptions(options));
		// const schema = serializeMap(input, mapGenericsOptions(options))
		// const schema = input.toJSON(options);
		const a = ''
		// return input.canRef ? toRef(input, schema, options) : schema;
		return schema
	}

	return serializeObject(input, options);
}

const serializeClass = (value: any, options: JsonSchemaOptions = {}) => {
	const store = getJsonEntityStore(value.class);
	const name = createRefName(store.schema.getName() || value.getName(), options);

	if (value.hasGenerics) {
		// Inline generic
		const {type, properties, additionalProperties, items, ...props} = value.toJSON(options);
		const schema = {
			...serializeAny(store.schema, {
				...options,
				...popGenerics(value),
				root: false
			}),
			...props
		};

		if (schema.title) {
			const name = createRefName(schema.title, options);
			options.schemas![name] = schema;
			delete schema.title;

			return createRef(name, options);
		}

		return schema;
	}

	if (options.schemas && !options.schemas[name]) {
		options.schemas[name] = {}; // avoid infinite calls
		options.schemas[name] = serializeAny(
			store.schema,
			mapGenericsOptions({
				...options,
				root: false
			})
		);
	}

	return createRef(name, options);
}

export const serializeJsonSchema = (schema: JsonSchema, options: JsonSchemaOptions = {}): any => {
	const {useAlias = true, schemas = {}, genericTypes} = options;
	const a = Array.from(schema.entries())
	let obj: any = a.reduce((item: any, [key, value]) => {
		if (shouldSkipKey(key, options)) {
			return item;
		}

		key = key.replace(/^#/, "");

		if (key === "type") {
			value = schema.getJsonType();
		}

		if (key === "examples" && isObject(value) && [SpecTypes.OPENAPI, SpecTypes.SWAGGER].includes(options.specType!)) {
			key = "example";
			value = Object.values(value)[0];
		}

		if (value) {
			if (value.isClass) {
				value = serializeClass(value, {
					...options,
					useAlias,
					schemas
				});

			} else {
				value = serializeAny(value, {
					...options,
					useAlias,
					schemas,
					genericTypes,
					genericLabels: schema.genericLabels
				});
			}
		}

		if (isEmptyProperties(key, value)) {
			return item;
		}

		if (shouldMapAlias(key, value, useAlias)) {
			value = mapAliasedProperties(value, schema.alias);
		}

		item[key] = value;

		return item;
	}, {});

	if (schema.isClass) {
		obj = serializeInherited(obj, schema.getComputedType(), {...options, root: false, schemas});
	}

	obj = serializeGenerics(obj, {...options, root: false, schemas} as any);

	if (schema.has(options.specType as string)) {
		obj = {
			...obj,
			...schema.get(options.specType as string).toJSON(options)
		};
	}

	obj = getRequiredProperties(obj, schema, useAlias);

	if (options.specType === SpecTypes.OPENAPI && isArray(obj.type)) {
		obj = transformTypes(obj);
	}

	if ((obj.oneOf || obj.allOf || obj.anyOf) && !(obj.items || obj.properties)) {
		delete obj.type;
	}

	return obj;
}
