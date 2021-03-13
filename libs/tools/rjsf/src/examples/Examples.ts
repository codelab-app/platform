import { Rjsf } from '../decorators/Rjsf';
import { RjsfProperty } from '../decorators/RjsfProperty';

@Rjsf({
	title: 'Examples',
	description: 'A text field with example values.'
})
export class Examples {

	@RjsfProperty({
		type: 'string',
		title: 'Browser',
		examples: [
			'Firefox',
			'Chrome',
			'Opera',
			'Vivaldi',
			'Safari'
		]
	})
	declare browser: string
}
