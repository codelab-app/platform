import { generateSchemas } from '@codelab/tools/generators/form-decorator';
import { BasicEnumModel } from './models/Enums/BasicEnumModel';
import { BasicEnumDisabledFields } from './models/Enums/BasicEnumDisabledFields';
import { BasicEnumWithNamesModel } from './models/Enums/BasicEnumWithNamesModel';
import { MultipleChoiceEnumModel } from './models/Enums/MultipleChoiceEnumModel';

describe('Enums/Lists', () => {
	it('should generate valid enum schema', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(BasicEnumModel)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				province: {
					type: 'string',
					enum: ['Ontario', 'Alberta', 'Quebec'],
					title: 'Province'
				}

			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					province: {span: 24}
				}
			],
		})
	})
	it('should generate valid enum schema with names', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(BasicEnumWithNamesModel)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				province: {
					type: 'string',
					enum: ['ON', 'AB', 'QB'],
					enumNames: ['Ontario', 'Alberta', 'Quebec'],
					title: 'Province'
				}

			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					province: {span: 24}
				}
			],
		})
	})
	it('should generate valid enum schema with disabled options', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(BasicEnumDisabledFields)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				province: {
					type: 'string',
					enum: ['Ontario', 'Alberta', 'Quebec'],
					title: 'Province'
				}

			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					province: {span: 24}
				}
			],
			province: {
				'ui:enumDisabled': ['Alberta']
			}
		})
	})

	it('should generate valid multiple choice schema from enum', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(MultipleChoiceEnumModel)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				province: {
					type: 'array',
					items: {
						type: 'string',
						enum: ['Ontario', 'Alberta', 'Quebec']
					},
					uniqueItems: true,
					title: 'Province'
				}
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					province: {span: 24}
				}
			],
		})
	})
})
