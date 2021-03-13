import { RjsfProperty } from '../decorators/RjsfProperty';
import { RjsfEnum } from '../decorators/RjsfEnum';
import { RjsfUiSchema } from '../decorators/RjsfUiSchema';
import { RjsfNumber } from '../decorators/RjsfNumber';

export class Numbers {

	@RjsfProperty({
		type: 'number',
		title: 'Number',
	})
	declare numberField: number

	@RjsfProperty({
		type: 'integer',
		title: 'Integer',
	})
	@RjsfUiSchema({
		'ui:widget': 'updown'
	})
	declare integerField: number

	@RjsfProperty({
		type: 'number',
		title: 'Number enum',
	})
	@RjsfEnum({
		enum: [1, 2, 3]
	})
	declare numberEnum: Array<number>

	@RjsfProperty({
		type: 'number',
		title: 'Number enum',
	})
	@RjsfEnum({
		enum: [1, 2, 3]
	})
	@RjsfUiSchema({
		'ui:widget': 'radio',
		'ui:options': {
			'inline': true
		}
	})
	declare numberEnumRadio: Array<number>

	@RjsfProperty({
		type: 'integer',
		title: 'Integer range',

	})
	@RjsfNumber({
		minimum: 42,
		maximum: 100
	})
	@RjsfUiSchema({
		'ui:widget': 'range'
	})
	declare integerRange: any

	@RjsfProperty({
		type: 'integer',
		title: 'Integer range (by 10)',
	})
	@RjsfNumber({
		minimum: 50,
		maximum: 100,
		multipleOf: 10
	})
	@RjsfUiSchema({
		'ui:widget': 'range'
	})
	declare integerRangeSteps: any
}
