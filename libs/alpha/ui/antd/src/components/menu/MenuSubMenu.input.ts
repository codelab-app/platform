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
import { SubMenuProps } from 'antd/lib/menu'
import { ReactNode } from 'react'
import { JsonSchemaArray } from '../../../../../../backend/src/common/decorators/JsonSchemaArray'
import { MenuItemProps } from './MenuItem.input'

class Props implements SubMenuProps {
  @JsonSchemaArray(MenuItemProps)
  @Title('Children of type MenuItem')
  @Description('Sub-menus or sub-menu items')
  children?: any

  @Optional()
  @Description('Whether sub-menu is disabled')
  disabled?: boolean

  @Optional()
  @Property('string')
  @Description('Icon of sub menu')
  icon?: ReactNode

  @Optional()
  @Description('Unique ID of the sub-menu')
  key?: string

  @Optional()
  @Description('Sub-menu class name, not working when mode="inline"')
  popupClassName?: string

  @Optional()
  @Schema({
    title: 'Popup offset in the format of number, number',
    type: 'array',
    items: [
      {
        title: 'A number',
        type: 'number',
        default: 0,
      },
      {
        title: 'A number',
        type: 'number',
        default: 0,
      },
    ],
  })
  popupOffset?: any

  @Optional()
  @Property('string')
  @Description('Title of sub menu')
  title?: ReactNode

  // onTitleClick?: (e: TitleEventEntity) => void;
}

export class MenuSubMenuProps {
  @Property()
  @Enum(VertexType.React_Menu_SubMenu)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
