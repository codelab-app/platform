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

// const buildImportString = (matches: string[]) => {
export const buildImportString = (stringUISchema: string) => {
	const superRegex = /(?<="ui:ObjectFieldTemplate"\s*\:\s*)(.[^,]{0,})/g
	const matches = stringUISchema.match(superRegex)
	if (matches) {
		const matchesWithoutQuotes = matches.map((match: string) => {
			return match.replace(/"/g, '')
		}).filter((v, i, a) => a.indexOf(v) === i && v !== undefined);
		return `import { ${[...matchesWithoutQuotes]} } from '@codelab/tools/generators/form-templates'\n`
	}
	return ''
}

export const getSchemaString = (obj: {schema: any, uiSchema: any}, className: string = ''): string => {
	const superRegex = /(?<="ui:ObjectFieldTemplate"\s*\:\s*)(".{0,}?(?=")")/g

	let stringUISchema = JSON.stringify(obj.uiSchema, null, 2)

	// const matches = stringUISchema.match(superRegex)
	// const importString = matches ? buildImportString(matches) : ''

	stringUISchema = stringUISchema.replace(superRegex, (substring: string) => {
		return substring.replace(/"/g, '')
	})

	stringUISchema = `export const ${className}UiSchema = ${stringUISchema}`

	let stringSchema = JSON.stringify(obj.schema, null, 2)
	stringSchema = `export const ${className}Schema = ${stringSchema}`

	// const finalString = `${importString}\n${stringSchema}\n${stringUISchema}\n`
	const finalString = `${stringSchema}\n${stringUISchema}\n`

	return finalString
}

export const writeSchemasToFile = (obj: {schema: any, uiSchema: any}, path: string) => {
	const finalString = getSchemaString(obj)

	// require('fs').writeFile(`${path}/generatedSchema.ts`, finalString, (err: any) => {
	require('fs').writeFile(`${path}`, finalString, (err: any) => {
		if (err) throw err;
	});
}
