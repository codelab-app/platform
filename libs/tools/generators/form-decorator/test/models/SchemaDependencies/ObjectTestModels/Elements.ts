import { RjsfGrid } from '../../../../src/decorators/RjsfGrid';
import { RjsfGridProp } from '../../../../src/decorators/RjsfGridProp';
import { ButtonProps } from './ButtonProps';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate',
})
export class Elements {
	@RjsfGridProp({
		row: 0,
		span: 12,
		title: 'Select Element',
		enum: ['Button', 'Card']
	})
	declare elements: string

	@RjsfGridProp({
		row: 0,
		span: 12,
		title: 'Props for Button',
		clazz: ButtonProps,
		condition: {key: 'elements', value: 'Button'}
	})
	declare buttonProps: ButtonProps
}
