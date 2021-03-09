import { RjsfGrid } from '../../../src/decorators/RjsfGrid';
import { RjsfGridProp } from '../../../src/decorators/RjsfGridProp';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate',
})
export class Questions {

	@RjsfGridProp({
		row: 0,
		span: 12,
		title: 'Do you have any pets?',
		enum: ['Yes', 'No', 'Maybe']
	})
	declare pets: string

	@RjsfGridProp({
		row: 0,
		span: 12,
		title: 'What is your gender?',
		enum: ['Male', 'Female', 'Other']
	})
	declare gender: string

	@RjsfGridProp({
		row: 0,
		span: 12,
		title: 'How old is your pet?',
		condition: {key: 'pets', value: 'Yes'}
	})
	declare age: number

	@RjsfGridProp({
		row: 1,
		span: 12,
		title: 'Would you like to buy one?',
		condition: {key: 'pets', value: 'No'}
	})
	declare buy: string

	@RjsfGridProp({
		row: 0,
		span: 24,
		title: 'Other gender',
		condition: {key: 'gender', value: 'Other'}
	})
	declare genderType: string
}
