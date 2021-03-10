import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { MinLength } from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
import { ButtonProps } from '@codelab/antd'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';
import { CardProps } from '../../../../../../../alpha/ui/antd/src/components/card/Card.input';
import { CardGridProps } from '../../../../../../../alpha/ui/antd/src/components/card/CardGrid.input';
import { CardMetaProps } from '../../../../../../../alpha/ui/antd/src/components/card/CardMeta.input';
import { IconProps } from '../../../../../../../alpha/ui/antd/src/components/icon/Icon.input';
import { DividerProps } from '../../../../../../../alpha/ui/antd/src/components/divider/Divider.input';
import { LayoutProps } from '../../../../../../../alpha/ui/antd/src/components/layout/Layout.input';
import { LayoutSiderProps } from '../../../../../../../alpha/ui/antd/src/components/layout/LayoutSider.input';
import { SpaceProps } from '../../../../../../../alpha/ui/antd/src/components/space/Space.input';
import { AffixProps } from '../../../../../../../alpha/ui/antd/src/components/affix/Affix.input';
import { BreadCrumbProps } from '../../../../../../../alpha/ui/antd/src/components/breadcrumb/Breadcrumb.input';
import { BreadcrumbItemProps } from '../../../../../../../alpha/ui/antd/src/components/breadcrumb/BreadcrumbItem.input';
import { DropDownProps } from '../../../../../../../alpha/ui/antd/src/components/dropdown/Dropdown.input';
import { MenuProps } from '../../../../../../../alpha/ui/antd/src/components/menu/Menu.input';
import { MenuItemProps } from '../../../../../../../alpha/ui/antd/src/components/menu/MenuItem.input';
import { MenuSubMenuProps } from '../../../../../../../alpha/ui/antd/src/components/menu/MenuSubMenu.input';
import { MenuItemGroupProps } from '../../../../../../../alpha/ui/antd/src/components/menu/MenuItemGroup.input';
import { TagProps } from '../../../../../../../alpha/ui/antd/src/components/tag/Tag.input';
import { PaginationProps } from '../../../../../../../alpha/ui/antd/src/components/pagination/Pagination.input';


@InputType()
// @JsonSchemaTypeDependencies(PropsList)
@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class UpdateVertexInput {
  @Field()
  @MinLength(3)
  @RjsfGridProp({ row: 0, span: 24, required: true })
  declare vertexId: string

  @Field(() => String, { nullable: true })
  @RjsfGridProp({ row: 1, span: 24, required: true, enum: VertexType })
  declare type?: VertexType

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Button props',
    condition: {key: 'type', value: VertexType.React_Button},
    clazz: ButtonProps
  })
  declare buttonProps: ButtonProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Card props',
    condition: {key: 'type', value: VertexType.React_Card},
    clazz: CardProps
  })
  declare cardProps: CardProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Card Grid Props',
    condition: {key: 'type', value: VertexType.React_Card_Grid},
    clazz: CardGridProps
  })
  declare cardGridProps: CardGridProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Card Meta Props',
    condition: {key: 'type', value: VertexType.React_Card_Meta},
    clazz: CardMetaProps
  })
  declare cardMetaProps: CardMetaProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Icon Props',
    condition: {key: 'type', value: VertexType.React_Icon},
    clazz: IconProps
  })
  declare iconProps: IconProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Divider Props',
    condition: {key: 'type', value: VertexType.React_Divider},
    clazz: DividerProps
  })
  declare dividerProps: DividerProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Props',
    condition: {key: 'type', value: VertexType.React_Layout},
    clazz: LayoutProps
  })
  declare layoutProps: LayoutProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Header Props',
    condition: {key: 'type', value: VertexType.React_Layout_Header},
    clazz: LayoutProps
  })
  declare layoutHeaderProps: LayoutProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Footer Props',
    condition: {key: 'type', value: VertexType.React_Layout_Footer},
    clazz: LayoutProps
  })
  declare layoutFooterProps: LayoutProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Content Props',
    condition: {key: 'type', value: VertexType.React_Layout_Content},
    clazz: LayoutProps
  })
  declare layoutContentProps: LayoutProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Sider Props',
    condition: {key: 'type', value: VertexType.React_Layout_Sider},
    clazz: LayoutSiderProps
  })
  declare layoutSiderProps: LayoutSiderProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Space Props',
    condition: {key: 'type', value: VertexType.React_Space},
    clazz: SpaceProps
  })
  declare spaceProps: SpaceProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Affix Props',
    condition: {key: 'type', value: VertexType.React_Affix},
    clazz: AffixProps
  })
  declare affixProps: AffixProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Bread Crumb Props',
    condition: {key: 'type', value: VertexType.React_Breadcrumb},
    clazz: BreadCrumbProps
  })
  declare breadcrumbProps: BreadCrumbProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Bread Crumb Props',
    condition: {key: 'type', value: VertexType.React_Breadcrumb_Item},
    clazz: BreadcrumbItemProps
  })
  declare breadcrumbItemProps: BreadcrumbItemProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Drop Down Props',
    condition: {key: 'type', value: VertexType.React_Dropdown},
    clazz: DropDownProps
  })
  declare dropdownProps: DropDownProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Menu Props',
    condition: {key: 'type', value: VertexType.React_Menu},
    clazz: MenuProps
  })
  declare menuProps: MenuProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Menu Item Props',
    condition: {key: 'type', value: VertexType.React_Menu_Item},
    clazz: MenuItemProps
  })
  declare menuItemProps: MenuItemProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Menu Item Props',
    condition: {key: 'type', value: VertexType.React_Menu_SubMenu},
    clazz: MenuSubMenuProps
  })
  declare menuSubMenuProps: MenuSubMenuProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Menu Item Group Props',
    condition: {key: 'type', value: VertexType.React_Menu_ItemGroup},
    clazz: MenuItemGroupProps
  })
  declare menuItemGroupProps: MenuItemGroupProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Tag Props',
    condition: {key: 'type', value: VertexType.React_Tag},
    clazz: TagProps
  })
  declare tagProps: TagProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Pagination Props',
    condition: {key: 'type', value: VertexType.React_Pagination},
    clazz: PaginationProps
  })
  declare paginationProps: PaginationProps

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
