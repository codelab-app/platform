import { Optional, Schema, } from '@tsed/schema'
import { SubMenuProps } from 'antd/lib/menu'
import { ReactNode } from 'react'
import { MenuItemProps } from './MenuItem.input'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class MenuSubMenuProps implements SubMenuProps {

  @RjsfGridProp({
    title: 'Children of type MenuItem',
    description: 'Sub-menus or sub-menu items',
    isArray: true,
    clazz: MenuItemProps,
    row: 0,
    span: 24,
  })
  children?: any

  @RjsfGridProp({
    title: 'Disabled',
    description: 'Whether sub-menu is disabled',
    row: 1,
    span: 24,
  })
  disabled?: boolean

  @RjsfGridProp({
    title: 'Icon',
    description: 'Icon of sub menu',
    type: 'string',
    row: 2,
    span: 24,
  })
  icon?: ReactNode

  @RjsfGridProp({
    title: 'Key',
    description: 'Unique ID of the sub-menu',
    row: 3,
    span: 24,
  })
  key?: string

  @RjsfGridProp({
    title: 'popupClassName',
    description: 'Sub-menu class name, not working when mode="inline"',
    row: 4,
    span: 24,
  })
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
  @RjsfGridProp({
    row: 5,
    span: 24,
  })
  popupOffset?: any

  @RjsfGridProp({
    title: 'Title',
    description: 'Title of sub menu',
    type: 'string',
    row: 6,
    span: 24,
  })
  title?: ReactNode

  // onTitleClick?: (e: TitleEventEntity) => void;
}

// export class MenuSubMenuProps {
//   @Property()
//   @Enum(VertexType.React_Menu_SubMenu)
//   declare type: string
//
//   @Schema(getJsonSchema(Props, { customKeys: true }))
//   @Title('')
//   declare props: object
// }
