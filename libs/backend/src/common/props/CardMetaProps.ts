import { VertexType } from '@prisma/client'
import { Default, Enum, Property, Title } from '@tsed/schema'
import { Card } from '@codelab/alpha/ui/antd'

export class CardMetaProps {
  @Property()
  @Enum(VertexType.React_Card_Meta)
  declare type: string

  @Enum('', ...Card.metaPropKeys)
  @Title('Property Key')
  // @Default(Card.metaPropKeys[0])
  declare key: any

  @Property()
  @Title('Property Value')
  @Default('')
  declare value: string
}
