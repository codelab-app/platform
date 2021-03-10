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
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class TagProps implements AntTagProps {

  @RjsfGridProp({
    title: 'Closable',
    description: 'Whether the Tag can be closed',
    row: 0,
    span: 24,
  })
  closable?: boolean

  @RjsfGridProp({
    title: 'Close Icon',
    description: 'Custom close icon',
    type: 'string',
    row: 1,
    span: 24,
  })
  closeIcon?: React.ReactNode

  @RjsfGridProp({
    title: 'Color',
    description: 'Color of the Tag',
    row: 2,
    span: 24,
  })
  color?: string

  @RjsfGridProp({
    title: 'Icon',
    description: 'Set the icon of tag',
    type: 'string',
    row: 3,
    span: 24,
  })
  icon?: React.ReactNode

  @RjsfGridProp({
    title: 'Visible',
    description: 'Whether the Tag is closed or not',
    row: 3,
    span: 24,
  })
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
