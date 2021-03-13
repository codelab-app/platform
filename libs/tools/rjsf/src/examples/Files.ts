import { Rjsf } from '../decorators/Rjsf';
import { RjsfProperty } from '../decorators/RjsfProperty';
import { RjsfArray } from '../decorators/RjsfArray';
import { RjsfUiSchema } from '../decorators/RjsfUiSchema';

@Rjsf({
	title: 'Files',
})
export class Files {

	@RjsfProperty({
		type: 'string',
		format: 'data-url'
	})
	declare file: string

	@RjsfProperty({
		type: 'array',
	})
	@RjsfArray({
		type: 'string',
		format: 'data-url'
	})
	declare files: any

	@RjsfProperty({
		type: 'string',
		format: 'data-url',
		title: 'Single File with Accept attribute'
	})
	@RjsfUiSchema({
		'ui:options': {
			'accept': '.pdf'
		}
	})
	declare fileAccept: any
}
