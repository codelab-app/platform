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
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class MenuProps implements AntMenuProps {

  @RjsfGridProp({
    title: 'Default Open Keys',
    description: 'Array with the keys of default opened sub menus',
    type: 'string',
    isArray: true,
    row: 0,
    span: 24,
  })
  defaultOpenKeys?: Array<string>

  @RjsfGridProp({
    title: 'Default Selected Keys',
    description: 'Array with the keys of default selected menu items',
    type: 'string',
    isArray: true,
    row: 1,
    span: 24,
  })
  defaultSelectedKeys?: Array<string>

  @RjsfGridProp({
    title: 'Expand Icon',
    description: 'Custom expand icon of submenu',
    type: 'string',
    row: 2,
    span: 24,
  })
  expandIcon?: ReactNode | ((props: any) => ReactNode)

  @RjsfGridProp({
    title: 'Force SubMenu Render',
    description: 'Render submenu into DOM before it becomes visible',
    row: 3,
    span: 24,
  })
  forceSubMenuRender?: boolean

  @RjsfGridProp({
    title: 'Inline Collapsed',
    description: 'Specifies the collapsed status when menu is inline mode',
    row: 4,
    span: 24,
  })
  inlineCollapsed?: boolean

  @RjsfGridProp({
    title: 'Inline Indent',
    description: 'Indent (in pixels) of inline menu items on each level',
    default: 24,
    row: 5,
    span: 24,
  })
  inlineIndent?: number

  @RjsfGridProp({
    title: 'Menu Mode',
    description: 'Type of menu',
    type: 'string',
    enum: ['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline'],
    default: 'vertical',
    row: 6,
    span: 24,
  })
  mode?: MenuMode

  @RjsfGridProp({
    title: 'Multiple',
    description: 'Allows selection of multiple items',
    row: 7,
    span: 24,
  })
  multiple?: boolean

  @RjsfGridProp({
    title: 'Open Keys',
    description: 'Array with the keys of currently opened sub-menus',
    type: 'string',
    isArray: true,
    row: 8,
    span: 24,
  })
  openKeys?: Array<string>

  @RjsfGridProp({
    title: 'Overflowed Indicator',
    description: 'Customized icon when menu is collapsed',
    type: 'string',
    row: 9,
    span: 24,
  })
  overflowedIndicator?: ReactNode

  @RjsfGridProp({
    title: 'Selectable',
    description: 'Allows selecting menu items',
    row: 10,
    span: 24,
  })
  selectable?: boolean

  @RjsfGridProp({
    title: 'Selected Keys',
    description: 'Array with the keys of currently selected menu items',
    type: 'string',
    isArray: true,
    row: 11,
    span: 24,
  })
  selectedKeys?: Array<string>

  @RjsfGridProp({
    title: 'Style',
    description: 'Style of the root node',
    type: 'string',
    row: 12,
    span: 24,
  })
  style?: CSSProperties

  @RjsfGridProp({
    title: 'SubMenu Close Delay',
    description: 'Delay time to hide submenu when mouse leaves (in seconds)',
    default: 0.1,
    row: 13,
    span: 24,
  })
  subMenuCloseDelay?: number

  @RjsfGridProp({
    title: 'SubMenu Open Delay',
    description: 'Delay time to show submenu when mouse enters, (in seconds)',
    default: 0,
    row: 14,
    span: 24,
  })
  subMenuOpenDelay?: number

  @RjsfGridProp({
    title: 'Theme',
    description: 'Color theme of the menu',
    type: 'string',
    enum: ['light', 'dark'],
    default: 'light',
    row: 15,
    span: 24,
  })
  theme?: MenuTheme

  @Optional()
  @Default('hover')
  @Enum('hover', 'click')
  @Description('Which action can trigger submenu open/close')
  @RjsfGridProp({
    title: 'Trigger SubMenu Action',
    description: 'Which action can trigger submenu open/close',
    type: 'string',
    enum: ['hover', 'click'],
    default: 'hover',
    row: 16,
    span: 24,
  })
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
