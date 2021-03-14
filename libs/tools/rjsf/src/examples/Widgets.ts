import { Rjsf } from '../decorators/Rjsf'
import { RjsfEnum } from '../decorators/RjsfEnum'
import { RjsfObject } from '../decorators/RjsfObject'
import { RjsfProperty } from '../decorators/RjsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Rjsf({
  title: 'String field',
})
class StringField {
  @RjsfProperty({
    type: 'string',
    title: 'text input (default)',
  })
  declare default: string

  @RjsfProperty({
    type: 'string',
    title: 'textarea',
  })
  @RjsfUiSchema({
    'ui:widget': 'textarea',
    'ui:options': {
      rows: 5,
    },
  })
  declare textarea: string

  @RjsfProperty({
    type: 'string',
  })
  @RjsfUiSchema({
    'ui:placeholder': 'This is a placeholder',
  })
  declare placeholder: string

  @RjsfProperty({
    type: 'string',
    title: 'color picker',
    default: '#151ce6',
  })
  @RjsfUiSchema({
    'ui:widget': 'color',
  })
  declare color: string
}

@Rjsf({
  title: 'Boolean field',
})
class BooleanField {
  @RjsfProperty({
    type: 'boolean',
    title: 'checkbox (default)',
    description: 'This is the checkbox-description',
  })
  declare default: string

  @RjsfProperty({
    type: 'boolean',
    title: 'radio buttons',
    description: 'This is the radio-description',
  })
  @RjsfUiSchema({
    'ui:widget': 'radio',
  })
  declare radio: string

  @RjsfProperty({
    type: 'boolean',
    title: 'select box',
    description: 'This is the select-description',
  })
  @RjsfUiSchema({
    'ui:widget': 'select',
  })
  declare select: string
}

@Rjsf({
  title: 'String formats',
})
class StringFormats {
  @RjsfProperty({
    type: 'string',
    format: 'email',
  })
  declare email: string

  @RjsfProperty({
    type: 'string',
    format: 'uri',
  })
  declare uri: string
}

@Rjsf({
  title: 'Widgets',
})
export class Widgets {
  @RjsfProperty({
    type: 'object',
  })
  @RjsfObject(StringFormats)
  declare stringFormats: StringFormats

  @RjsfProperty({
    type: 'object',
  })
  @RjsfObject(BooleanField)
  @RjsfUiSchema()
  declare booleanField: BooleanField

  @RjsfProperty({
    type: 'object',
  })
  @RjsfObject(StringField)
  @RjsfUiSchema()
  declare stringField: StringField

  @RjsfProperty({
    type: 'string',
    default: "I'm a hidden string.",
  })
  @RjsfUiSchema({
    'ui:widget': 'hidden',
  })
  declare secret: string

  @RjsfProperty({
    type: 'string',
    title: 'A disabled field',
    default: "I'm disabled",
  })
  @RjsfUiSchema({
    'ui:disabled': true,
  })
  declare disabled: string

  @RjsfProperty({
    type: 'string',
    title: 'A readonly field',
    default: 'I am read-only.',
  })
  @RjsfUiSchema({
    'ui:readonly': true,
  })
  declare readonly: string

  @RjsfProperty({
    type: 'string',
    title: 'Another readonly field',
    default: 'I am also read-only.',
    readOnly: true,
  })
  declare readonly2: string

  @RjsfProperty({
    type: 'string',
    title: 'Custom widget with options',
    default: 'I am yellow',
  })
  @RjsfUiSchema({
    'ui:options': {
      backgroundColor: 'yellow',
    },
  })
  declare widgetOptions: string

  @RjsfProperty({
    type: 'string',
  })
  @RjsfEnum({
    enum: ['foo', 'bar'],
    enumNames: ['Foo', 'Bar'],
  })
  @RjsfUiSchema({
    'ui:options': {
      backgroundColor: 'pink',
    },
  })
  declare selectWidgetOptions: string
}
