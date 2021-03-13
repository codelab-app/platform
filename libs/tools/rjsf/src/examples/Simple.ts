import { Rjsf } from '../decorators/Rjsf'
import { RjsfProperty } from '../decorators/RjsfProperty'

@Rjsf({
  title: 'A registration form',
  description: 'A simple form example.',
})
export class Simple {
  @RjsfProperty({
    type: 'string',
    title: 'First name',
  })
  declare firstName: string

  @RjsfProperty({
    type: 'string',
    title: 'Last name',
  })
  declare lastName: string

  @RjsfProperty({
    type: 'string',
    title: 'Telephone',
    minLength: 10,
  })
  declare telephone: string
}
