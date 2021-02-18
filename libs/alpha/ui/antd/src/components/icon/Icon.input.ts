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
import * as React from 'react'

class Props {
  @Optional()
  @Description('The className of Icon')
  className?: string

  @Optional()
  @Property('string')
  @Description('Rotate by n degrees (not working in IE9)')
  rotate?: number

  @Optional()
  @Description('Rotate icon with animation')
  spin?: boolean

  @Optional()
  @Property('string')
  @Description('The style properties of icon, like fontSize and color')
  style?: React.CSSProperties

  @Optional()
  @Description('Only supports the two-tone icon. Specify the primary color')
  twoToneColor?: string
}

export class IconProps {
  @Property()
  @Enum(VertexType.React_Icon)
  declare type: string

  @Schema(getJsonSchema(Props))
  @Title('')
  declare props: object
}
