import { RjsfProperty } from '../decorators/RjsfProperty';
import { RjsfArrayObject } from '../decorators/RjsfArrayObject';

class Task {
	@RjsfProperty({
		type: 'string',
		title: 'Title',
		description: 'A sample title',
		required: true
	})
	declare title: string

	@RjsfProperty({
		type: 'string',
		title: 'Task details',
		description: 'Enter the task details'
	})
	declare details: string

	@RjsfProperty({
		type: 'boolean',
		title: 'Done?',
		default: false
	})
	declare done: boolean
}

export class Nested {

	@RjsfProperty({
		type: 'string',
		title: 'Task list title',
	})
	declare title: string

	@RjsfProperty({
		type: 'object',
		title: 'Tasks',
	})
	@RjsfArrayObject({clazz: Task})
	declare tasks: Task
}
