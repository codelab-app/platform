import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class BasicEnumModel {
	@RjsfGridProp({
		row: 0,
		span: 24,
		title: 'Province',
		enum: ['Ontario', 'Alberta', 'Quebec']
	})
	declare province: string
}
