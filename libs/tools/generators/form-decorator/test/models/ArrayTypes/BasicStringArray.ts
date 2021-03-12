import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class BasicStringArray {
	@RjsfGridProp({
		title: 'Strings Field',
		description: 'Specify Strings',
		type: 'string',
		isArray: true,
		row: 0,
		span: 24,
	})
	stringsField?: Array<string>
}
