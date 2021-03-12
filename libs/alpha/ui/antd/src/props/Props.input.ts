import { JsonSchema, Schema } from '@tsed/schema'
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
import { CssPropsSchema } from '@codelab/generated'

export const PropsList = [
  ButtonProps, // done
  CardProps, // done
  CardGridProps, // done
  CardMetaProps, // done
  IconProps, // done
  DividerProps, // done
  LayoutProps, // done
  LayoutSiderProps, // done
  SpaceProps, // done
  AffixProps, // done
  BreadcrumbSelectedProps, // done
  BreadcrumbItemProps, // done
  DropdownSelectedProps, // done
  MenuSelectedProps, // done
  MenuItemSelectedProps, // done
  MenuSubMenuProps, // done
  MenuItemGroupProps, // done
  PageHeaderProps,
  AvatarSelectedProps,
  TagSelectedProps, // done
  PaginationProps, // done
  StepsProps,
  StepsStepProps,
  AutoCompleteProps,
]

@Schema((CssPropsSchema as unknown) as JsonSchema)
export class CssProps {}
