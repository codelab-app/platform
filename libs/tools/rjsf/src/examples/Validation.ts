import { Rjsf } from '../decorators/Rjsf'
import { RjsfNumber } from '../decorators/RjsfNumber'
import { RjsfProperty } from '../decorators/RjsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Rjsf({
  title: 'Custom validation',
  description:
    'This form defines custom validation rules checking that the two passwords match.',
})
export class Validation {
  @RjsfProperty({
    type: 'string',
    minLength: 3,
    title: 'Password',
  })
  @RjsfUiSchema({
    'ui:widget': 'password',
  })
  declare pass1: string

  @RjsfProperty({
    type: 'string',
    minLength: 3,
    title: 'Repeat Password',
  })
  @RjsfUiSchema({
    'ui:widget': 'password',
  })
  declare pass2: string

  @RjsfProperty({
    type: 'number',
    title: 'Age',
  })
  @RjsfNumber({
    minimum: 18,
  })
  declare age: number
}
