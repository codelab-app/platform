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

export class MenuItemProps implements AntMenuItemProps {
  @Optional()
  @Description('Display the danger style')
  danger?: boolean

  @Optional()
  @Description('Whether menu item is disabled')
  disabled?: boolean

  @Optional()
  @Property('string')
  @Description('The icon of the menu item')
  icon?: React.ReactNode

  @Optional()
  @Description('Unique ID of the menu item')
  key?: string

  @Optional()
  @Description('Set display title for collapsed item')
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
