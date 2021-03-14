import { RjsfArray } from '../decorators/RjsfArray'
import { RjsfArrayObject } from '../decorators/RjsfArrayObject'
import { RjsfDefinition } from '../decorators/RjsfDefinition'
import { RjsfItems } from '../decorators/RjsfItems'
import { RjsfMultipleChoice } from '../decorators/RjsfMultipleChoice'
import { RjsfProperty } from '../decorators/RjsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'
import { NestedListInnerList } from './Arrays-nestedList'

class InnerList {
  @RjsfProperty({
    type: 'array',
  })
  @RjsfItems({
    type: 'string',
    default: 'lorem ipsum',
  })
  declare field: string
}

@RjsfDefinition({
  name: 'Thing',
})
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
  @RjsfItems({
    type: 'string',
    default: 'bazinga',
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
    items: [Thing],
  })
  declare minItemsList: Array<Thing>

  @RjsfProperty({
    type: 'array',
    title: 'List and item level defaults',
    minItems: 5,
    default: ['carp', 'trout', 'bream'],
  })
  @RjsfArray({
    items: {
      type: 'string',
      default: 'unidentified',
    },
  })
  declare defaultsAndMinItems: string

  @RjsfProperty({
    type: 'array',
    title: 'Nested List',
    items: [NestedListInnerList],
  })
  declare nestedList: Array<NestedListInnerList>

  @RjsfProperty({
    type: 'array',
    title: 'Unorderable items',
  })
  @RjsfItems({
    type: 'string',
    default: 'lorem ipsum',
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
  @RjsfItems({
    type: 'string',
    default: 'lorem ipsum',
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
  @RjsfItems({
    type: 'string',
    default: 'lorem ipsum',
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
