import { Jsf } from '../decorators/Jsf'
import { JsfProperty } from '../decorators/JsfProperty'

@Jsf({
  title: 'Examples',
  description: 'A text field with example values.',
})
export class Examples {
  @JsfProperty({
    type: 'string',
    title: 'Browser',
    examples: ['Firefox', 'Chrome', 'Opera', 'Vivaldi', 'Safari'],
  })
  declare browser: string
}
