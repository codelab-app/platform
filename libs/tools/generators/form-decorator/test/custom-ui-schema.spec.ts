import { generateSchemas } from '@codelab/tools/generators/form-decorator';
import { GridFormWithHiddenWidget } from './models/CustomUiSchema/GridFormWithHiddenWidget';
import { GroupFormWithHiddenWidget } from './models/CustomUiSchema/GroupFormWithHiddenWidget';

describe('Custom Ui Schema for basic props', () => {
	it('should generate grid schemas with hidden widget', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(GridFormWithHiddenWidget)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				appId: { type: 'string' },
				name: { type: 'string' }
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
			'ui:spacing': 16,
			'ui:layout': [
				{
					appId: { span: 24 }
				},
				{
					name: { span: 24 }
				}
			],
			appId: {
				'ui:widget': 'hidden'
			}
		})
	})
	it('should generate group schema with hidden widget', () => {
		const schemas: {schema: any, uiSchema: any} = generateSchemas(GroupFormWithHiddenWidget)
		const {schema, uiSchema} = schemas
		expect(schema).toMatchObject({
			type: 'object',
			properties: {
				a: {type: 'string'},
				b: {type: 'string'},
				c: {type: 'string'}
			}
		})
		expect(uiSchema).toMatchObject({
			'ui:ObjectFieldTemplate': 'RjsfTabsFieldTemplate',
			'ui:groups': [
				{ panelTitle: 'Tab 1', fields: ['a', 'b'] },
				{ panelTitle: 'Tab 2', fields: ['c'] }
			],
			a: {
				'ui:widget': 'hidden'
			}
		})
	})
})
