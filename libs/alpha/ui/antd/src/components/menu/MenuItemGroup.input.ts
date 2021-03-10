import { ReactNode } from 'react'
import { MenuItemProps } from './MenuItem.input'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class MenuItemGroupProps {

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
    title: 'Title',
    description: 'The title of the group',
    type: 'string',
    row: 1,
    span: 24,
  })
  title?: ReactNode
}

// export class MenuItemGroupProps {
//   @Property()
//   @Enum(VertexType.React_Menu_ItemGroup)
//   declare type: string
//
//   @Schema(getJsonSchema(Props, { customKeys: true }))
//   @Title('')
//   declare props: object
// }
