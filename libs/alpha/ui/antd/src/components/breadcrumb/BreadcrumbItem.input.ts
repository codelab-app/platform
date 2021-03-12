import { BreadcrumbItemProps as AntBreadcrumbItemProps } from 'antd/lib/breadcrumb'
import { DropDownProps } from '../dropdown/Dropdown.input'
import { MenuProps } from '../menu/Menu.input'
import {
  RjsfGrid,
  RjsfGridProp,
  RjsfGroup,
  RjsfGroupProp,
} from '@codelab/tools/generators/form-decorator'

@RjsfGroup({
  ObjectFieldTemplate: 'RjsfAccordionFieldTemplate',
})
class BreadCrumbsItemTabs {
  @RjsfGroupProp({ panelTitle: 'Dropdown Props', clazz: DropDownProps })
  declare dropdownProps: any

  @RjsfGroupProp({ panelTitle: 'Menu Props', clazz: MenuProps })
  declare menuProps: any
}

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate',
})
export class BreadcrumbItemProps
  implements Omit<AntBreadcrumbItemProps, 'dropdownProps'> {
  @RjsfGridProp({
    clazz: BreadCrumbsItemTabs,
    title: 'Dropdown and Menu Props',
    row: 0,
    span: 24,
  })
  declare tabs: BreadCrumbsItemTabs

  @RjsfGridProp({
    title: 'Class Name',
    description: 'The additional css class',
    row: 1,
    span: 24,
  })
  className?: string

  // @RjsfGridProp({
  //   title: 'Dropdown Props',
  //   description: 'The dropdown props',
  //   clazz: DropDownProps,
  //   row: 1,
  //   span: 24,
  // })
  declare dropdownProps?: any

  @RjsfGridProp({
    title: 'Href',
    description: 'Target of hyperlink',
    row: 2,
    span: 24,
  })
  href?: string

  // @RjsfGridProp({
  //   title: 'Menu Props',
  //   description: 'The dropdown menu',
  //   clazz: MenuProps,
  //   row: 3,
  //   span: 24,
  // })
  overlay?: any

  // onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
}

// export class BreadcrumbItemProps {
//   @Property()
//   @Enum(VertexType.React_Breadcrumb_Item)
//   declare type: string
//
//   @Schema(getJsonSchema(Props, { customKeys: true }))
//   @Title('')
//   declare props: object
// }
