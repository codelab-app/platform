import { VertexType } from '@prisma/client'
import {
  CollectionOf,
  Default,
  Description,
  Enum,
  Optional,
  Property,
  Required,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import {
  CardProps as AntCardProps,
  CardSize,
  CardTabListType,
  CardType,
} from 'antd/lib/card'
import * as React from 'react'
import { JsonSchemaArray } from '../../../../../../backend/src/common/decorators/JsonSchemaArray'

class CardTabListTypeImpl implements CardTabListType {
  @Required()
  declare key: string

  @Required()
  @Property('string')
  declare tab: React.ReactNode

  @Optional()
  declare disabled?: boolean
}

class Props implements AntCardProps {
  @Optional()
  @CollectionOf(String)
  @Description('The action list, shows at the bottom of the Card')
  actions?: Array<React.ReactNode>

  @Optional()
  @Property('string')
  @Description("Current TabPane's key")
  activeTabKey?: string

  @Optional()
  @Property('string')
  @Description('Inline style to apply to the card content')
  bodyStyle?: React.CSSProperties

  @Optional()
  @Default(true)
  @Description('Toggles rendering of the border around the card')
  bordered?: boolean

  @Optional()
  @Property('string')
  @Description('Card cover')
  cover?: React.ReactNode

  @Optional()
  @Property('string')
  @Description("Initial active TabPane's key, if activeTabKey is not set")
  defaultActiveTabKey?: string

  @Optional()
  @Property('string')
  @Description('Content to render in the top-right corner of the card')
  extra?: React.ReactNode

  @Optional()
  @Property('string')
  @Description('Inline style to apply to the card head')
  headStyle?: React.CSSProperties

  @Optional()
  @Description('Lift up when hovering card')
  hoverable?: boolean

  @Optional()
  @Description(
    'Shows a loading indicator while the contents of the card are being fetched',
  )
  loading?: boolean

  @Optional()
  @Default('default')
  @Enum('default', 'small')
  @Description('Size of card')
  size?: CardSize

  @Optional()
  @Property('string')
  @Description('Extra content in tab bar')
  tabBarExtraContent?: React.ReactNode | null

  @Optional()
  @JsonSchemaArray(CardTabListTypeImpl)
  @Description("List of TabPane's head")
  tabList?: Array<CardTabListType>

  // TODO: Implement Tabs
  // tabProps?: TabsProps;

  @Optional()
  @Property('string')
  @Description('Card title')
  title?: React.ReactNode

  @Optional()
  @Enum('inner')
  @Description('Card style type, can be set to inner or not set')
  type?: CardType

  // onTabChange?: (key: string) => void;
}

export class CardProps {
  @Property()
  @Enum(VertexType.React_Card)
  declare type: string

  @Schema(getJsonSchema(Props))
  @Title('')
  declare props: object
}
