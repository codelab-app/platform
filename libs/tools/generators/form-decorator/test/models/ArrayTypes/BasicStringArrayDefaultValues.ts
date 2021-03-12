import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class BasicStringArrayDefaultValues {
	@RjsfGridProp({
		title: 'Strings Field',
		description: 'Specify Strings',
		type: 'string',
		isArray: true,
		default: ['10', '20', '50', '100'],
		row: 0,
		span: 24,
	})
	stringsField?: Array<string>
}
