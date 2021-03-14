import { Jsf } from '../decorators/Jsf'
import { JsfProperty } from '../decorators/JsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Jsf({
  title: 'A registration form',
})
@RjsfUiSchema({
  'ui:order': ['firstName', 'lastName', '*', 'password'],
})
export class Ordering {
  @JsfProperty({
    type: 'string',
    title: 'Password',
  })
  @RjsfUiSchema({
    'ui:widget': 'password',
  })
  declare password: string

  @JsfProperty({
    type: 'string',
    title: 'Last Name',
  })
  @RjsfUiSchema({
    'ui:widget': 'textarea',
  })
  declare lastName: string

  @JsfProperty({
    type: 'string',
    title: 'Bio',
  })
  declare bio: string

  @JsfProperty({
    type: 'string',
    title: 'First Name',
  })
  declare firstName: string

  @JsfProperty({
    type: 'integer',
    title: 'Age',
  })
  @RjsfUiSchema({
    'ui:widget': 'updown',
  })
  declare age: number
}
