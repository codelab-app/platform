import { Jsf } from '../decorators/Jsf'
import { JsfProperty } from '../decorators/JsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

class StringField {
  @JsfProperty({
    type: 'string',
    title: 'text input (default)',
  })
  declare default: string

  @JsfProperty({
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

  @JsfProperty({
    type: 'string',
  })
  @RjsfUiSchema({
    'ui:placeholder': 'This is a placeholder',
  })
  declare placeholder: string

  @JsfProperty({
    type: 'string',
    title: 'color picker',
    default: '#151ce6',
  })
  @RjsfUiSchema({
    'ui:widget': 'color',
  })
  declare color: string
}

class BooleanField {
  @JsfProperty({
    type: 'boolean',
    title: 'checkbox (default)',
    description: 'This is the checkbox-description',
  })
  declare default: string

  @JsfProperty({
    type: 'boolean',
    title: 'radio buttons',
    description: 'This is the radio-description',
  })
  @RjsfUiSchema({
    'ui:widget': 'radio',
  })
  declare radio: string

  @JsfProperty({
    type: 'boolean',
    title: 'select box',
    description: 'This is the select-description',
  })
  @RjsfUiSchema({
    'ui:widget': 'select',
  })
  declare select: string
}

class StringFormats {
  @JsfProperty({
    type: 'string',
    format: 'email',
  })
  declare email: string

  @JsfProperty({
    type: 'string',
    format: 'uri',
  })
  declare uri: string
}

@Jsf({
  type: 'object',
  title: 'Widgets',
})
export class Widgets {
  @JsfProperty({
    type: 'object',
    title: 'String formats',
    properties: StringFormats
  })
  declare stringFormats: StringFormats

  @JsfProperty({
    type: 'object',
    title: 'Boolean field',
    properties: BooleanField
  })
  @RjsfUiSchema()
  declare 'boolean': BooleanField

  @JsfProperty({
    type: 'object',
    properties: StringField,
    title: 'String field'
  })
  @RjsfUiSchema()
  declare 'string': StringField

  @JsfProperty({
    type: 'string',
    default: 'I\'m a hidden string.',
  })
  @RjsfUiSchema({
    'ui:widget': 'hidden',
  })
  declare secret: string

  @JsfProperty({
    type: 'string',
    title: 'A disabled field',
    default: 'I am disabled.',
  })
  @RjsfUiSchema({
    'ui:disabled': true,
  })
  declare disabled: string

  @JsfProperty({
    type: 'string',
    title: 'A readonly field',
    default: 'I am read-only.',
  })
  @RjsfUiSchema({
    'ui:readonly': true,
  })
  declare readonly: string

  @JsfProperty({
    type: 'string',
    title: 'Another readonly field',
    default: 'I am also read-only.',
    readOnly: true,
  })
  declare readonly2: string

  @JsfProperty({
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

  @JsfProperty({
    type: 'string',
    title: 'Custom select widget with options',
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
