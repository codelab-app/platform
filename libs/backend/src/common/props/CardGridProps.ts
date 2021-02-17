import { VertexType } from '@prisma/client'
import { Default, Enum, Property, Title } from '@tsed/schema'
import { Card } from '@codelab/alpha/ui/antd'

export class CardGridProps {
  @Property()
  @Enum(VertexType.React_Card_Grid)
  declare type: string

  @Enum('', ...Card.gridPropKeys)
  @Title('Property Key')
  declare key: any

  @Property()
  @Title('Property Value')
  @Default('')
  declare value: string
}
