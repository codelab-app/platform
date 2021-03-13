import { Rjsf } from '../decorators/Rjsf';
import { RjsfProperty } from '../decorators/RjsfProperty';
import { RjsfObject } from '../decorators/RjsfObject';
import { RjsfUiSchema } from '../decorators/RjsfUiSchema';

@Rjsf({
	title: 'Alternative',
	description: 'These work on most platforms.'
})
class Alternative {
	@RjsfProperty({
		type: 'string',
		format: 'date-time'
	})
	@RjsfUiSchema({
		'ui:widget': 'alt-datetime',
		'ui:options': {
			'yearsRange': [
				1980,
				2030
			]
		}
	})
	declare altDatetime: string
	@RjsfProperty({
		type: 'string',
		format: 'date'
	})
	@RjsfUiSchema({
		'ui:widget': 'alt-date',
		'ui:options': {
			'yearsRange': [
				1980,
				2030
			]
		}
	})
	declare altDate: string
}

@Rjsf({
	title: 'Native',
	description: 'May not work on some browsers, notably Firefox Desktop and IE.'
})
class Native {
	@RjsfProperty({
		type: 'string',
		format: 'date-time'
	})
	declare dateTime: string

	@RjsfProperty({
		type: 'string',
		format: 'date'
	})
	declare date: string
}

@Rjsf({
	title: 'Date and time widgets',
})
export class DateTime {
	@RjsfProperty({
		type: 'object',
	})
	@RjsfObject(Native)
	declare native: Native

	@RjsfProperty({
		type: 'object',
	})
	declare alternative: any
}
