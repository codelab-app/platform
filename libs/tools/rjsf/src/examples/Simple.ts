import { Jsf } from '../decorators/Jsf'
import { JsfProperty } from '../decorators/JsfProperty'

@Jsf({
  title: 'A registration form',
  description: 'A simple form example.',
})
export class Simple {
  @JsfProperty({
    type: 'string',
    title: 'First name',
  })
  declare firstName: string

  @JsfProperty({
    type: 'string',
    title: 'Last name',
  })
  declare lastName: string

  @JsfProperty({
    type: 'string',
    title: 'Telephone',
    minLength: 10,
  })
  declare telephone: string
}
