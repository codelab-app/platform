import { VertexType } from '@prisma/client'
import {
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { CardGridProps as AntCardGridProps } from 'antd/lib/card'
import * as React from 'react'

class Props implements AntCardGridProps {
  @Optional()
  @Description('The className of container')
  className?: string

  @Optional()
  @Description('Lift up when hovering card grid')
  hoverable?: boolean

  @Optional()
  @Property('string')
  @Description('The style object of container')
  style?: React.CSSProperties
}

export class CardGridProps {
  @Property()
  @Enum(VertexType.React_Card_Grid)
  declare type: string

  @Schema(getJsonSchema(Props))
  @Title('')
  declare props: object
}
