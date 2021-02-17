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
import { BreadcrumbItemProps as AntBreadcrumbItemProps } from 'antd/lib/breadcrumb'
import { DropDownProps } from '../dropdown/Dropdown.input'
import { MenuProps } from '../menu/Menu.input'

class Props implements Omit<AntBreadcrumbItemProps, 'dropdownProps'> {
  @Optional()
  @Description('The additional css class')
  className?: string

  @Optional()
  @Schema(getJsonSchema(DropDownProps, { customKeys: true }))
  @Title('Dropdown Props')
  @Description('The dropdown props')
  declare dropdownProps?: any

  @Optional()
  @Description('Target of hyperlink')
  href?: string

  @Optional()
  @Schema(getJsonSchema(MenuProps, { customKeys: true }))
  @Title('Menu Props')
  @Description('The dropdown menu')
  overlay?: any

  // onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
}

export class BreadcrumbItemProps {
  @Property()
  @Enum(VertexType.React_Breadcrumb_Item)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
