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
import { MenuItemProps as AntMenuItemProps } from 'antd/lib/menu'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class MenuItemProps implements AntMenuItemProps {

  @RjsfGridProp({
    title: 'Danger',
    description: 'Display the danger style',
    row: 0,
    span: 24,
  })
  danger?: boolean

  @RjsfGridProp({
    title: 'Disabled',
    description: 'Whether menu item is disabled',
    row: 1,
    span: 24,
  })
  disabled?: boolean

  @RjsfGridProp({
    title: 'Icon',
    description: 'The icon of the menu item',
    type: 'string',
    row: 2,
    span: 24,
  })
  icon?: React.ReactNode

  @RjsfGridProp({
    title: 'Key',
    description: 'Unique ID of the menu item',
    row: 3,
    span: 24,
  })
  key?: string

  @RjsfGridProp({
    title: 'Title',
    description: 'Set display title for collapsed item',
    row: 4,
    span: 24,
  })
  title?: string
}

export class MenuItemSelectedProps {
  @Property()
  @Enum(VertexType.React_Menu_Item)
  declare type: string

  @Schema(getJsonSchema(MenuItemProps, { customKeys: true }))
  @Title('')
  declare props: object
}
