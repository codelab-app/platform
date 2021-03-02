import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { Enum, MinLength, Required } from '@tsed/schema'
// import { PropsSchema } from '@codelab/generated'
import { ButtonProps } from '@codelab/antd'
import { JsonSchemaTypeDependencies } from '../../../../../../../backend/src/common/decorators/JsonSchemaTypeDependencies';
import { CardProps } from '../../../../../../../alpha/ui/antd/src/components/card/Card.input';
import { CardGridProps } from '../../../../../../../alpha/ui/antd/src/components/card/CardGrid.input';
import { CardMetaProps } from '../../../../../../../alpha/ui/antd/src/components/card/CardMeta.input';
import { IconProps } from '../../../../../../../alpha/ui/antd/src/components/icon/Icon.input';
import { DividerProps } from '../../../../../../../alpha/ui/antd/src/components/divider/Divider.input';
import { LayoutProps } from '../../../../../../../alpha/ui/antd/src/components/layout/Layout.input';
import { LayoutSiderProps } from '../../../../../../../alpha/ui/antd/src/components/layout/LayoutSider.input';
import { SpaceProps } from '../../../../../../../alpha/ui/antd/src/components/space/Space.input';
import { AffixProps } from '../../../../../../../alpha/ui/antd/src/components/affix/Affix.input';
import { BreadcrumbSelectedProps } from '../../../../../../../alpha/ui/antd/src/components/breadcrumb/Breadcrumb.input';
import { BreadcrumbItemProps } from '../../../../../../../alpha/ui/antd/src/components/breadcrumb/BreadcrumbItem.input';
import { DropdownSelectedProps } from '../../../../../../../alpha/ui/antd/src/components/dropdown/Dropdown.input';
import { MenuSelectedProps } from '../../../../../../../alpha/ui/antd/src/components/menu/Menu.input';
import { MenuItemSelectedProps } from '../../../../../../../alpha/ui/antd/src/components/menu/MenuItem.input';
import { MenuSubMenuProps } from '../../../../../../../alpha/ui/antd/src/components/menu/MenuSubMenu.input';
import { MenuItemGroupProps } from '../../../../../../../alpha/ui/antd/src/components/menu/MenuItemGroup.input';
import { PageHeaderProps } from '../../../../../../../alpha/ui/antd/src/components/page-header/PageHeader.input';
import { AvatarSelectedProps } from '../../../../../../../alpha/ui/antd/src/components/avatar/Avatar.input';
import { TagSelectedProps } from '../../../../../../../alpha/ui/antd/src/components/tag/Tag.input';
import { PaginationProps } from '../../../../../../../alpha/ui/antd/src/components/pagination/Pagination.input';
import { StepsProps } from '../../../../../../../alpha/ui/antd/src/components/steps/Steps.input';
import { StepsStepProps } from '../../../../../../../alpha/ui/antd/src/components/steps/StepsStep.input';
import { AutoCompleteProps } from '../../../../../../../alpha/ui/antd/src/components/autocomplete/AutoComplete.input';


// @Grid<any>({
//   props: {
//     'data-grid': {
//       x: {
//         __grid: {
//           order: 1,
//           span: 6,
//         },
//       },
//       y: {
//         __grid: {
//           order: 2,
//           span: 6,
//         },
//       },
//       w: {
//         __grid: {
//           order: 3,
//           span: 6,
//         },
//       },
//       h: {
//         __grid: {
//           order: 4,
//           span: 6,
//         },
//       },
//     },
//   },
// })
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
@InputType()
export class UpdateVertexInput {
  @Field()
  @MinLength(3)
  @Required()
  declare vertexId: string

  // @Field(() => GraphQLJSONObject, { nullable: true })
  // @Schema(getJsonSchema(Props, { customKeys: true }))
  // declare props?: object

  @Enum(VertexType)
  @Field(() => String, { nullable: true })
  declare type?: VertexType
}
