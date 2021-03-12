import "reflect-metadata";
import { generateGridUiSchema } from './generator-uiSchema--grid';
import { generateGroupsUiSchema } from './generator-uiSchema--groups';
import { getJsonSchemaCustom } from './custom-tsed/getJsonSchemaCustom';
import { Type } from '@tsed/core';

export const generatorUiSchema = (target: Function) => {
	const classDecorators = Reflect.getMetadataKeys(target)
	if (classDecorators.includes('RjsfGrid')) {
		return generateGridUiSchema(target)
	}

	if (classDecorators.includes('RjsfGroup')) {
		return generateGroupsUiSchema(target)
	}

	throw new Error('target must include one of the following decorators: RjsfGrid or RjsfGroup')

}

export const generateSchemas = (target: Function): {schema: any, uiSchema: any} => {
	const uiSchema = generatorUiSchema(target)
	const schema = getJsonSchemaCustom(target as Type<any>, {customKeys: true})

	return {
		schema,
		uiSchema
	}
}

export const buildImportString = (stringUISchema: string) => {
	const superRegex = /(?<="ui:ObjectFieldTemplate"\s*\:\s*)(.[^,]{0,})/g
	const matches = stringUISchema.match(superRegex)
	if (matches) {
		const matchesWithoutQuotes = matches.map((match: string) => {
			return match.replace(/"/g, '')
		}).filter((v, i, a) => a.indexOf(v) === i && v !== undefined);
		return `import { ${[...matchesWithoutQuotes]} } from '@codelab/tools/generators/form-templates'\n\n`
	}
	return ''
}

export const getSchemaString = (obj: {schema: any, uiSchema: any, name: string}): string => {
	const superRegex = /(?<="ui:ObjectFieldTemplate"\s*\:\s*)(".{0,}?(?=")")/g

	let stringUISchema = JSON.stringify(obj.uiSchema, null, 2)

	stringUISchema = stringUISchema.replace(superRegex, (substring: string) => {
		return substring.replace(/"/g, '')
	})

	stringUISchema = `export const ${obj.name}UiSchema = ${stringUISchema}`

	let stringSchema = JSON.stringify(obj.schema, null, 2)
	stringSchema = `export const ${obj.name}Schema: JSONSchema7 = ${stringSchema}`

	const finalString = `${stringSchema}\n${stringUISchema}\n`

	return finalString
}
