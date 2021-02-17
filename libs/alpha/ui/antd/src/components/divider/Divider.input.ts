import { VertexType } from '@prisma/client'
import {
  Default,
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { DividerProps as AntDividerProps } from 'antd/lib/divider'
import * as React from 'react'

class Props implements AntDividerProps {
  @Optional()
  @Description('The className of container')
  className?: string

  @Optional()
  @Description('Whether line is dashed')
  dashed?: boolean

  @Optional()
  @Default('center')
  @Enum('left', 'right', 'center')
  @Description('The position of title inside divider')
  orientation?: 'left' | 'right' | 'center'

  @Optional()
  @Description('Divider text show as plain style')
  plain?: boolean

  @Optional()
  @Property('string')
  @Description('The style object of container')
  style?: React.CSSProperties

  @Optional()
  @Default('horizontal')
  @Enum('horizontal', 'vertical')
  @Description('The direction type of divider')
  type?: 'horizontal' | 'vertical'
}

export class DividerProps {
  @Property()
  @Enum(VertexType.React_Divider)
  declare type: string

  @Schema(getJsonSchema(Props))
  @Title('')
  declare props: object
}
