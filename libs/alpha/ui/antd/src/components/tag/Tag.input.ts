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
import { TagProps as AntTagProps } from 'antd/lib/tag'
import * as React from 'react'

export class TagProps implements AntTagProps {
  @Optional()
  @Description('Whether the Tag can be closed')
  closable?: boolean

  @Optional()
  @Property('string')
  @Description('Custom close icon')
  closeIcon?: React.ReactNode

  @Optional()
  @Description('Color of the Tag')
  color?: string

  @Optional()
  @Property('string')
  @Description('Set the icon of tag')
  icon?: React.ReactNode

  @Optional()
  @Description('Whether the Tag is closed or not')
  visible?: boolean

  // onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

export class TagSelectedProps {
  @Property()
  @Enum(VertexType.React_Tag)
  declare type: string

  @Schema(getJsonSchema(TagProps, { customKeys: true }))
  @Title('')
  declare props: object
}
