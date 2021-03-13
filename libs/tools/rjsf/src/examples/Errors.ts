import { Rjsf } from '../decorators/Rjsf';
import { RjsfProperty } from '../decorators/RjsfProperty';
import { RjsfArray } from '../decorators/RjsfArray';
import { RjsfMultipleChoice } from '../decorators/RjsfMultipleChoice';

@Rjsf({
	title: 'Contextualized errors'
})
export class Errors {

	@RjsfProperty({
		type: 'string',
		title: 'First name',
		minLength: 8,
		pattern: `\\\\d+`
	})
	declare firstName: string

	@RjsfProperty({
		type: 'boolean',
		title: 'Active'
	})
	declare active: boolean

	@RjsfProperty({
		type: 'array',
	})
	@RjsfArray({
		type: 'string',
		minLength: 5
	})
	declare skills: any

	@RjsfProperty({
		type: 'array',
		title: 'Pick max two items',
		maxItems: 2
	})
	@RjsfMultipleChoice({
		type: 'string',
		choices: [
			'foo',
			'bar',
			'fuzz'
		]
	})
	declare multipleChoicesList: any
}
