import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class BasicNumberArray {
	@RjsfGridProp({
		title: 'Number Fields',
		description: 'Specify Numbers',
		type: 'number',
		isArray: true,
		row: 0,
		span: 24,
	})
	numberField?: Array<number>
}
