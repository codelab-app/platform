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
import { PageHeaderProps as AntPageHeaderProps } from 'antd/lib/page-header'
import * as React from 'react'
import { JsonSchemaArray } from '../../../../../../backend/src/common/decorators/JsonSchemaArray'
import { AvatarProps } from '../avatar/Avatar.input'
import { BreadCrumbProps } from '../breadcrumb/Breadcrumb.input'
import { TagProps } from '../tag/Tag.input'

class Props implements AntPageHeaderProps {
  @Schema(getJsonSchema(AvatarProps))
  @Title('Avatar Props')
  @Description('Avatar next to the title bar')
  avatar?: any

  @Optional()
  @Property('string')
  @Description('Custom back icon, if false the back icon will not be displayed')
  backIcon?: React.ReactNode

  @Optional()
  @Title('Breadcrumb props')
  @Schema(getJsonSchema(BreadCrumbProps, { customKeys: true }))
  @Description('Breadcrumb configuration')
  breadcrumb?: any

  // breadcrumbRender?: (props: PageHeaderProps, defaultDom: React.ReactNode) => React.ReactNode;

  @Optional()
  @Property('string')
  @Description('Operating area, at the end of the line of the title line')
  extra?: React.ReactNode

  @Optional()
  @Property('string')
  @Description("PageHeader's footer, generally used to render TabBar")
  footer?: React.ReactNode

  @Optional()
  @Description('PageHeader type, will change background color')
  ghost?: boolean

  @Optional()
  @Property('string')
  @Description('Custom subtitle text')
  subTitle?: React.ReactNode

  @Optional()
  @JsonSchemaArray(TagProps)
  @Description('Tag list next to title')
  tags?: any | Array<any>

  @Optional()
  @Property('string')
  @Description('Custom title text')
  title?: React.ReactNode

  // onBack?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export class PageHeaderProps {
  @Property()
  @Enum(VertexType.React_PageHeader)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
