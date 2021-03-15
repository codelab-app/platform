import { Jsf } from '../decorators/Jsf'
import { JsfProperty } from '../decorators/JsfProperty'

@Jsf({
  title: 'Contextualized errors',
})
export class Errors {
  @JsfProperty({
    type: 'string',
    title: 'First name',
    minLength: 8,
    pattern: `\\\\d+`,
  })
  declare firstName: string

  @JsfProperty({
    type: 'boolean',
    title: 'Active',
  })
  declare active: boolean

  @JsfProperty({
    type: 'array',
    items: {
      type: 'string',
      minLength: 5,
    },
  })
  declare skills: any

  @JsfProperty({
    type: 'array',
    title: 'Pick max two items',
    maxItems: 2,
    uniqueItems: true,
    items: {
      type: 'string',
      enum: ['foo', 'bar', 'fuzz'],
    },
  })
  declare multipleChoicesList: any
}
