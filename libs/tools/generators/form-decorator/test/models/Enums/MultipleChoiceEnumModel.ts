import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class MultipleChoiceEnumModel {
	@RjsfGridProp({
		row: 0,
		span: 24,
		title: 'Province',
		isMultipleChoice: true,
		enum: ['Ontario', 'Alberta', 'Quebec']
	})
	declare province: string
}
