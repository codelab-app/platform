import { JsfDefinition } from '../decorators/JsfDefinition'
import { JsfProperty } from '../decorators/JsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'
import { NestedListInnerList } from './Arrays-nestedList'
import { Jsf } from '../decorators/Jsf';

@JsfDefinition({
  name: 'Thing',
})
@Jsf({
  type: 'object'
})
class Thing {
  @JsfProperty({
    type: 'string',
    default: 'Default Name',
  })
  declare name: string
}

@Jsf({
  type: 'object'
})
export class Arrays {
  @JsfProperty({
    type: 'array',
    title: 'A list of strings',
    items: {
      type: 'string',
      default: 'bazinga'
    }
  })
  @RjsfUiSchema({
    items: {
      'ui:emptyValue': '',
    },
  })
  declare listOfStrings: Array<string>

  @JsfProperty({
    type: 'array',
    title: 'A multiple choices list',
    items: {
      type: 'string',
      enum: [
        'foo',
        'bar',
        'fuzz',
        'qux'
      ]
    },
    uniqueItems: true
  })
  @RjsfUiSchema({
    'ui:widget': 'checkboxes',
  })
  declare multipleChoicesList: Array<string>

  @JsfProperty({
    type: 'array',
    title: 'A list of fixed items',
    items: [
      {
        title: 'A string value',
        type: 'string',
        default: 'lorem ipsum'
      },
      {
        title: 'a boolean value',
        type: 'boolean'
      }
    ],
    additionalItems: {
      title: 'Additional item',
      type: 'number'
    }
  })
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
  declare fixedItemsList: any

  @JsfProperty({
    type: 'array',
    title: 'A list with a minimal number of items',
    minItems: 3,
    items: [Thing],
  })
  declare minItemsList: Array<Thing>

  @JsfProperty({
    type: 'array',
    title: 'List and item level defaults',
    minItems: 5,
    default: ['carp', 'trout', 'bream'],
    items: {
      type: 'string',
      default: 'unidentified',
    },
  })
  declare defaultsAndMinItems: string
  //
  // @JsfProperty({
  //   type: 'array',
  //   title: 'Nested List',
  //   items: NestedListInnerList,
  // })
  // declare nestedList: Array<NestedListInnerList>
  //
  // @JsfProperty({
  //   type: 'array',
  //   title: 'Unorderable items',
  //   items: {
  //     type: 'string',
  //     default: 'lorem ipsum',
  //   }
  // })
  // @RjsfUiSchema({
  //   'ui:options': {
  //     orderable: false,
  //   },
  // })
  // declare unorderable: string
  //
  // @JsfProperty({
  //   type: 'array',
  //   title: 'Unremovable items',
  //   items: {
  //     type: 'string',
  //     default: 'lorem ipsum',
  //   }
  // })
  // @RjsfUiSchema({
  //   'ui:options': {
  //     removable: false,
  //   },
  // })
  // declare unremovable: string
  //
  // @JsfProperty({
  //   type: 'array',
  //   title: 'No add, remove and order buttons',
  //   items: {
  //     type: 'string',
  //     default: 'lorem ipsum',
  //   }
  // })
  // @RjsfUiSchema({
  //   'ui:options': {
  //     addable: false,
  //     orderable: false,
  //     removable: false,
  //   },
  // })
  // declare noToolbar: string
  //
  // @JsfProperty({
  //   type: 'array',
  //   title: 'Fixed array without buttons',
  //   items: [
  //     {
  //       title: 'A string value',
  //       type: 'string',
  //       default: 'lorem ipsum'
  //     },
  //     {
  //       title: 'a boolean value',
  //       type: 'boolean'
  //     }
  //   ],
  //   additionalItems: {
  //     title: 'Additional item',
  //     type: 'number'
  //   }
  // })
  // @RjsfUiSchema({
  //   'ui:options': {
  //     addable: false,
  //     orderable: false,
  //     removable: false,
  //   },
  // })
  // declare fixedNoToolbar: any
}
