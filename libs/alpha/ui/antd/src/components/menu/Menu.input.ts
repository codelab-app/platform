import { VertexType } from '@prisma/client'
import {
  CollectionOf,
  Default,
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { MenuProps as AntMenuProps, MenuMode } from 'antd/lib/menu'
import { MenuTheme } from 'antd/lib/menu/MenuContext'
import { CSSProperties, ReactNode } from 'react'

export class MenuProps implements AntMenuProps {
  @Optional()
  @CollectionOf(String)
  @Description('Array with the keys of default opened sub menus')
  defaultOpenKeys?: Array<string>

  @Optional()
  @CollectionOf(String)
  @Description('Array with the keys of default selected menu items')
  defaultSelectedKeys?: Array<string>

  @Optional()
  @Property('string')
  @Description('custom expand icon of submenu')
  expandIcon?: ReactNode | ((props: any) => ReactNode)

  @Optional()
  @Description('Render submenu into DOM before it becomes visible')
  forceSubMenuRender?: boolean

  @Optional()
  @Description('Specifies the collapsed status when menu is inline mode')
  inlineCollapsed?: boolean

  @Optional()
  @Default(24)
  @Property('number')
  @Description('Indent (in pixels) of inline menu items on each level')
  inlineIndent?: number

  @Optional()
  @Default('vertical')
  @Enum('horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline')
  @Description('Type of menu')
  mode?: MenuMode

  @Optional()
  @Description('Allows selection of multiple items')
  multiple?: boolean

  @Optional()
  @CollectionOf(String)
  @Description('Array with the keys of currently opened sub-menus')
  openKeys?: Array<string>

  @Optional()
  @Property('string')
  @Description('Customized icon when menu is collapsed')
  overflowedIndicator?: ReactNode

  @Optional()
  @Description('Allows selecting menu items')
  selectable?: boolean

  @Optional()
  @CollectionOf(String)
  @Description('Array with the keys of currently selected menu items')
  selectedKeys?: Array<string>

  @Optional()
  @Property('string')
  @Description('Style of the root node')
  style?: CSSProperties

  @Optional()
  @Property('number')
  @Default(0.1)
  @Description('Delay time to hide submenu when mouse leaves (in seconds)')
  subMenuCloseDelay?: number

  @Optional()
  @Property('number')
  @Default(0)
  @Description('Delay time to show submenu when mouse enters, (in seconds)')
  subMenuOpenDelay?: number

  @Optional()
  @Default('light')
  @Enum('light', 'dark')
  @Description('Color theme of the menu')
  theme?: MenuTheme

  @Optional()
  @Default('hover')
  @Enum('hover', 'click')
  @Description('Which action can trigger submenu open/close')
  triggerSubMenuAction?: 'click' | 'hover'

  // onClick?: MenuClickEventHandler;
  // onDeselect?: SelectEventHandler;
  // onOpenChange?: (openKeys: React.Key[]) => void;
  // onSelect?: SelectEventHandler;
}

export class MenuSelectedProps {
  @Property()
  @Enum(VertexType.React_Menu)
  declare type: string

  @Schema(getJsonSchema(MenuProps, { customKeys: true }))
  @Title('')
  declare props: object
}
