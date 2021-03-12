import { User } from './models/ArrayTypes/User';
import { generateSchemas } from '@codelab/tools/generators/form-decorator';
import { BasicStringArrayDefaultValues } from './models/ArrayTypes/BasicStringArrayDefaultValues';
import { BasicBoolArray } from './models/ArrayTypes/BasicBoolArray';
import { BasicStringArray } from './models/ArrayTypes/BasicStringArray';
import { BasicNumberArrayDefaultValues } from './models/ArrayTypes/BasicNumberArrayDefaultValues';
import { BasicNumberArray } from './models/ArrayTypes/BasicNumberArray';

describe('Array Type Tests', () => {

	it('should generate schema for basic string array', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(BasicStringArray)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				stringsField: {
					type: 'array',
					items: {type: 'string'},
					title: 'Strings Field',
					description: 'Specify Strings'
				}
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					stringsField: {span: 24}
				}
			]
		})
	})
	it('should generate schema for basic number array', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(BasicNumberArray)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				numberField: {
					type: 'array',
					items: {type: 'number'},
					title: 'Number Fields',
					description: 'Specify Numbers'
				}
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					numberField: {span: 24}
				}
			]
		})
	})
	it('should generate schema for basic boolean array', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(BasicBoolArray)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				boolField: {
					type: 'array',
					items: {type: 'boolean'},
					title: 'Boolean Fields',
					description: 'Specify Booleans'
				}
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					boolField: {span: 24}
				}
			]
		})
	})

	it('should set default values for basic string array', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(BasicStringArrayDefaultValues)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				stringsField: {
					type: 'array',
					items: {type: 'string'},
					title: 'Strings Field',
					description: 'Specify Strings',
					default: ['10', '20', '50', '100']
				}
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					stringsField: {span: 24}
				}
			]
		})
	})
	it('should set default values for basic number array', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(BasicNumberArrayDefaultValues)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				numberField: {
					type: 'array',
					items: {type: 'number'},
					title: 'Number Fields',
					description: 'Specify Numbers',
					default: [1, 2, 3]
				}
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					numberField: {span: 24}
				}
			]
		})
	})

	it('should generate schema for object array', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(User)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				roles: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							roleType: {type: 'string', title: 'Role Type'},
							name: {type: 'string', title: 'Name'}
						}
					},
					title: 'Roles'
				}
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					roles: {span: 12}
				}
			],
			roles: {
				items: {
					'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
					'ui:spacing': 16,
					'ui:layout': [
						{
							roleType: {span: 12},
							'ui:order': ['roleType', 'name'],
							name: {span: 12}
						}
					]
				}
			}
		})
	})
})
