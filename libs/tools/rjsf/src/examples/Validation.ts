import { Jsf } from '../decorators/Jsf'
import { JsfProperty } from '../decorators/JsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Jsf({
  title: 'Custom validation',
  description:
    'This form defines custom validation rules checking that the two passwords match.',
})
export class Validation {
  @JsfProperty({
    type: 'string',
    minLength: 3,
    title: 'Password',
  })
  @RjsfUiSchema({
    'ui:widget': 'password',
  })
  declare pass1: string

  @JsfProperty({
    type: 'string',
    minLength: 3,
    title: 'Repeat Password',
  })
  @RjsfUiSchema({
    'ui:widget': 'password',
  })
  declare pass2: string

  @JsfProperty({
    type: 'number',
    title: 'Age',
    minimum: 18,
  })
  declare age: number
}
