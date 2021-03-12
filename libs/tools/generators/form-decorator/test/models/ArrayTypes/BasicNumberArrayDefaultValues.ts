import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class BasicNumberArrayDefaultValues {
	@RjsfGridProp({
		title: 'Number Fields',
		description: 'Specify Numbers',
		type: 'number',
		isArray: true,
		default: [1, 2, 3],
		row: 0,
		span: 24,
	})
	numberField?: Array<number>
}
