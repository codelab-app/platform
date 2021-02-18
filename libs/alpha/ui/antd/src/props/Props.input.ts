import { VertexType } from '@prisma/client'
import { Enum, Schema, Title } from '@tsed/schema'
import { JSONSchema6 } from 'json-schema'
import { JsonSchemaTypeDependencies } from '../../../../../backend/src/common/decorators/JsonSchemaTypeDependencies'
import { AffixProps } from '../components/affix/Affix.input'
import { AutoCompleteProps } from '../components/autocomplete/AutoComplete.input'
import { AvatarSelectedProps } from '../components/avatar/Avatar.input'
import { BreadcrumbSelectedProps } from '../components/breadcrumb/Breadcrumb.input'
import { BreadcrumbItemProps } from '../components/breadcrumb/BreadcrumbItem.input'
import { ButtonProps } from '../components/button/Button.input'
import { CardProps } from '../components/card/Card.input'
import { CardGridProps } from '../components/card/CardGrid.input'
import { CardMetaProps } from '../components/card/CardMeta.input'
import { DividerProps } from '../components/divider/Divider.input'
import { DropdownSelectedProps } from '../components/dropdown/Dropdown.input'
import { IconProps } from '../components/icon/Icon.input'
import { LayoutProps } from '../components/layout/Layout.input'
import { LayoutSiderProps } from '../components/layout/LayoutSider.input'
import { MenuSelectedProps } from '../components/menu/Menu.input'
import { MenuItemSelectedProps } from '../components/menu/MenuItem.input'
import { MenuItemGroupProps } from '../components/menu/MenuItemGroup.input'
import { MenuSubMenuProps } from '../components/menu/MenuSubMenu.input'
import { PageHeaderProps } from '../components/page-header/PageHeader.input'
import { PaginationProps } from '../components/pagination/Pagination.input'
import { SpaceProps } from '../components/space/Space.input'
import { StepsProps } from '../components/steps/Steps.input'
import { StepsStepProps } from '../components/steps/StepsStep.input'
import { TagSelectedProps } from '../components/tag/Tag.input'
import { VegaSchema } from '@codelab/generated'

@JsonSchemaTypeDependencies([
  ButtonProps,
  CardProps,
  CardGridProps,
  CardMetaProps,
  IconProps,
  DividerProps,
  LayoutProps,
  LayoutSiderProps,
  SpaceProps,
  AffixProps,
  BreadcrumbSelectedProps,
  BreadcrumbItemProps,
  DropdownSelectedProps,
  MenuSelectedProps,
  MenuItemSelectedProps,
  MenuSubMenuProps,
  MenuItemGroupProps,
  PageHeaderProps,
  AvatarSelectedProps,
  TagSelectedProps,
  PaginationProps,
  StepsProps,
  StepsStepProps,
  AutoCompleteProps,
  // ReactRGLContainerSelected,
])
@Title('')
export class Props {
  @Enum(VertexType)
  declare type?: VertexType
}

@Schema(VegaSchema as JSONSchema6)
export class CssProps {}
