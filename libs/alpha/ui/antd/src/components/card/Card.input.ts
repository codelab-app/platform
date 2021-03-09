import { CardProps as AntCardProps, CardSize, CardTabListType, CardType, } from 'antd/lib/card'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
class CardTabListTypeImpl implements CardTabListType {

  @RjsfGridProp({
    title: 'Key',
    required: true,
    row: 0,
    span: 12,
  })
  declare key: string

  @RjsfGridProp({
    title: 'Tab',
    required: true,
    type: 'string',
    row: 0,
    span: 12,
  })
  declare tab: React.ReactNode

  @RjsfGridProp({
    title: 'Disabled',
    row: 1,
    span: 24,
  })
  declare disabled?: boolean
}

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class CardProps implements AntCardProps {

  @RjsfGridProp({
    title: 'Actions',
    description: 'The action list, shows at the bottom of the Card',
    type: 'string',
    isArray: true,
    row: 0,
    span: 24,
  })
  actions?: Array<React.ReactNode>

  @RjsfGridProp({
    title: 'Active Tab Key',
    description: 'Current TabPane\'s key',
    row: 1,
    span: 24,
  })
  activeTabKey?: string

  @RjsfGridProp({
    title: 'Body Style',
    description: 'Inline style to apply to the card content',
    type: 'string',
    row: 2,
    span: 24,
  })
  bodyStyle?: React.CSSProperties

  @RjsfGridProp({
    title: 'Bordered',
    description: 'Toggles rendering of the border around the card',
    default: true,
    row: 3,
    span: 24,
  })
  bordered?: boolean

  @RjsfGridProp({
    title: 'Card cover',
    description: 'Card cover',
    type: 'string',
    row: 4,
    span: 24,
  })
  cover?: React.ReactNode

  @RjsfGridProp({
    title: 'Default Active Tab Key',
    description: 'Initial active TabPane\'s key, if activeTabKey is not set',
    row: 5,
    span: 24,
  })
  defaultActiveTabKey?: string

  @RjsfGridProp({
    title: 'Extra',
    description: 'Content to render in the top-right corner of the card',
    type: 'string',
    row: 6,
    span: 24,
  })
  extra?: React.ReactNode

  @RjsfGridProp({
    title: 'Head Style',
    description: 'Inline style to apply to the card head',
    type: 'string',
    row: 7,
    span: 24,
  })
  headStyle?: React.CSSProperties

  @RjsfGridProp({
    title: 'Hoverable',
    description: 'Lift up when hovering card',
    row: 8,
    span: 24,
  })
  hoverable?: boolean

  @RjsfGridProp({
    title: 'Loading',
    description: 'Shows a loading indicator while the contents of the card are being fetched',
    row: 9,
    span: 24,
  })
  loading?: boolean

  @RjsfGridProp({
    title: 'Card Size',
    description: 'Size of card',
    type: 'string',
    enum: ['default', 'small'],
    default: 'default',
    row: 10,
    span: 24,
  })
  size?: CardSize

  @RjsfGridProp({
    title: 'Tab Bar ExtraContent',
    description: 'Extra content in tab bar',
    type: 'string',
    row: 11,
    span: 24,
  })
  tabBarExtraContent?: React.ReactNode | null

  @RjsfGridProp({
    title: 'Tab List',
    description: 'List of TabPane\'s head',
    isArray: true,
    clazz: CardTabListTypeImpl,
    row: 12,
    span: 24,
  })
  tabList?: Array<CardTabListType>

  // TODO: Implement Tabs
  // tabProps?: TabsProps;

  @RjsfGridProp({
    title: 'Card title',
    description: 'Card title',
    type: 'string',
    row: 13,
    span: 24,
  })
  title?: React.ReactNode

  @RjsfGridProp({
    title: 'Type',
    description: 'Card style type, can be set to inner or not set',
    enum: ['inner'],
    type: 'string',
    row: 14,
    span: 24,
  })
  type?: CardType

  // onTabChange?: (key: string) => void;
}

// export class CardProps {
//   @Property()
//   @Enum(VertexType.React_Card)
//   declare type: string
//
//   @Schema(getJsonSchema(Props))
//   @Title('')
//   declare props: object
// }
