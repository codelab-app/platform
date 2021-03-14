import { JsfProperty } from '../decorators/JsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

export class Numbers {
  @JsfProperty({
    type: 'number',
    title: 'Number',
  })
  declare numberField: number

  @JsfProperty({
    type: 'integer',
    title: 'Integer',
  })
  @RjsfUiSchema({
    'ui:widget': 'updown',
  })
  declare integerField: number

  @JsfProperty({
    type: 'number',
    title: 'Number enum',
    enum: [1, 2, 3],
  })
  declare numberEnum: Array<number>

  @JsfProperty({
    type: 'number',
    title: 'Number enum',
    enum: [1, 2, 3],
  })
  @RjsfUiSchema({
    'ui:widget': 'radio',
    'ui:options': {
      inline: true,
    },
  })
  declare numberEnumRadio: Array<number>

  @JsfProperty({
    type: 'integer',
    title: 'Integer range',
    minimum: 42,
    maximum: 100,
  })
  @RjsfUiSchema({
    'ui:widget': 'range',
  })
  declare integerRange: any

  @JsfProperty({
    type: 'integer',
    title: 'Integer range (by 10)',
    minimum: 50,
    maximum: 100,
    multipleOf: 10,
  })
  @RjsfUiSchema({
    'ui:widget': 'range',
  })
  declare integerRangeSteps: any
}
