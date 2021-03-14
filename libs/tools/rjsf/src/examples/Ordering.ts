import { Rjsf } from '../decorators/Rjsf'
import { RjsfProperty } from '../decorators/RjsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Rjsf({
  title: 'A registration form',
})
@RjsfUiSchema({
  'ui:order': ['firstName', 'lastName', '*', 'password'],
})
export class Ordering {
  @RjsfProperty({
    type: 'string',
    title: 'Password',
  })
  @RjsfUiSchema({
    'ui:widget': 'password',
  })
  declare password: string

  @RjsfProperty({
    type: 'string',
    title: 'Last Name',
  })
  @RjsfUiSchema({
    'ui:widget': 'textarea',
  })
  declare lastName: string

  @RjsfProperty({
    type: 'string',
    title: 'Bio',
  })
  declare bio: string

  @RjsfProperty({
    type: 'string',
    title: 'First Name',
  })
  declare firstName: string

  @RjsfProperty({
    type: 'integer',
    title: 'Age',
  })
  @RjsfUiSchema({
    'ui:widget': 'updown',
  })
  declare age: number
}
