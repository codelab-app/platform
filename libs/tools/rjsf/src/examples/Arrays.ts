import { RjsfArray } from '../decorators/RjsfArray'
import { RjsfArrayObject } from '../decorators/RjsfArrayObject'
import { RjsfMultipleChoice } from '../decorators/RjsfMultipleChoice'
import { RjsfProperty } from '../decorators/RjsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

class InnerList {
  @RjsfProperty({
    type: 'array',
  })
  @RjsfArray({
    type: 'string',
    defaultValue: 'lorem ipsum',
  })
  declare field: string
}

class Thing {
  @RjsfProperty({
    type: 'string',
    default: 'Default Name',
  })
  declare name: string
}

class FixedItemsList {
  // in JsonSchema items is usually an object, however in fixed items list it is an array
  // we could introduce isFixedItem to group the fields into an array of items
  @RjsfProperty({
    type: 'string',
    title: 'A string value',
    default: 'lorem ipsum',
    isFixedItem: true,
  })
  declare stringValue: string

  @RjsfProperty({
    type: 'string',
    title: 'a boolean value',
    isFixedItem: true,
  })
  declare booleanValue: boolean

  // additionalItems is not fixed and goes outside items array
  @RjsfProperty({
    type: 'number',
    title: 'Additional item',
  })
  declare additionalItems: number
}

export class Arrays {
  @RjsfProperty({
    type: 'array',
    title: 'A list of strings',
  })
  @RjsfArray({
    type: 'string',
    defaultValue: 'bazinga',
  })
  @RjsfUiSchema({
    items: {
      'ui:emptyValue': '',
    },
  })
  declare listOfStrings: Array<string>

  @RjsfProperty({
    type: 'array',
    title: 'A multiple choices list',
  })
  @RjsfMultipleChoice({
    type: 'string',
    choices: ['foo', 'bar', 'fuzz', 'qux'],
  })
  @RjsfUiSchema({
    'ui:widget': 'checkboxes',
  })
  declare multipleChoicesList: Array<string>

  @RjsfProperty({
    type: 'array',
    title: 'A list of fixed items',
  })
  @RjsfArrayObject({ clazz: FixedItemsList, hasFixedItems: true })
  @RjsfUiSchema({
    items: [
      {
        'ui:widget': 'textarea',
      },
      {
        'ui:widget': 'select',
      },
    ],
    additionalItems: {
      'ui:widget': 'updown',
    },
  })
  declare fixedItemsList: FixedItemsList

  @RjsfProperty({
    type: 'array',
    title: 'A list with a minimal number of items',
    minItems: 3,
  })
  @RjsfArrayObject({ clazz: Thing })
  declare minItemsList: Thing

  @RjsfProperty({
    type: 'array',
    title: 'List and item level defaults',
    minItems: 5,
    default: ['carp', 'trout', 'bream'],
  })
  @RjsfArray({
    type: 'string',
    defaultValue: 'unidentified',
  })
  declare defaultsAndMinItems: string

  @RjsfProperty({
    type: 'array',
    title: 'Nested list',
  })
  @RjsfArrayObject({ clazz: InnerList })
  declare nestedList: any

  @RjsfProperty({
    type: 'array',
    title: 'Unorderable items',
  })
  @RjsfArray({
    type: 'string',
    defaultValue: 'lorem ipsum',
  })
  @RjsfUiSchema({
    'ui:options': {
      orderable: false,
    },
  })
  declare unorderable: string

  @RjsfProperty({
    type: 'array',
    title: 'Unremovable items',
  })
  @RjsfArray({
    type: 'string',
    defaultValue: 'lorem ipsum',
  })
  @RjsfUiSchema({
    'ui:options': {
      removable: false,
    },
  })
  declare unremovable: string

  @RjsfProperty({
    type: 'array',
    title: 'No add, remove and order buttons',
  })
  @RjsfArray({
    type: 'string',
    defaultValue: 'lorem ipsum',
  })
  @RjsfUiSchema({
    'ui:options': {
      addable: false,
      orderable: false,
      removable: false,
    },
  })
  declare noToolbar: string

  @RjsfProperty({
    type: 'array',
    title: 'Fixed array without buttons',
  })
  @RjsfArrayObject({ clazz: FixedItemsList })
  @RjsfUiSchema({
    'ui:options': {
      addable: false,
      orderable: false,
      removable: false,
    },
  })
  declare fixedNoToolbar: FixedItemsList
}
