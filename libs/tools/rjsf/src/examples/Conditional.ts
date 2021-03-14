import { RjsfConditional } from '../decorators/RjsfConditional'
import { RjsfEnum } from '../decorators/RjsfEnum'
import { RjsfProperty } from '../decorators/RjsfProperty'

class SomeObjectToShow {
  @RjsfProperty({
    type: 'string',
    title: 'Some Field',
  })
  declare someField: string
}

export class Conditional {
  @RjsfProperty({
    type: 'boolean',
    title: 'Show button',
  })
  declare show: boolean

  @RjsfProperty({
    type: 'string',
    title: 'Show button',
  })
  @RjsfConditional({ key: 'show', value: true })
  declare button: string

  @RjsfProperty({
    type: 'string',
    title: 'Do you have any pets?',
  })
  @RjsfEnum({ enum: ['Yes', 'No', 'Maybe'] })
  declare pets: Array<string>

  @RjsfProperty({
    type: 'string',
    title: 'How Many?',
  })
  @RjsfConditional({
    key: 'pets',
    value: 'Yes',
    clazz: SomeObjectToShow,
  })
  declare petsYes: SomeObjectToShow
}
