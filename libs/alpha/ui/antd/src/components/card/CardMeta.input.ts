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
import { CardMetaProps as AntCardMetaProps } from 'antd/lib/card'
import * as React from 'react'

class Props implements AntCardMetaProps {
  @Optional()
  @Property('string')
  @Description('Avatar or icon')
  avatar?: React.ReactNode

  @Optional()
  @Description('The className of container')
  className?: string

  @Optional()
  @Property('string')
  @Description('Description content')
  description?: React.ReactNode

  @Optional()
  @Property('string')
  @Description('The style object of container')
  style?: React.CSSProperties

  @Optional()
  @Property('string')
  @Description('Title content')
  title?: React.ReactNode
}

export class CardMetaProps {
  @Property()
  @Enum(VertexType.React_Card_Meta)
  declare type: string

  @Schema(getJsonSchema(Props))
  @Title('')
  declare props: object
}
