import { VertexType } from '@prisma/client'
import {
  Description,
  Enum,
  Optional,
  Property,
  Required,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { Omit } from 'antd/lib/_util/type'
import { BreadcrumbProps as AntBreadcrumbProps } from 'antd/lib/breadcrumb'
import { Route } from 'antd/lib/breadcrumb/Breadcrumb'
import * as React from 'react'
import { JsonSchemaArray } from '../../../../../../backend/src/common/decorators/JsonSchemaArray'

class Children {
  @Required()
  declare path: string

  @Required()
  declare breadcrumbName: string
}

class RouteImpl implements Route {
  @Required()
  declare path: string

  @Required()
  declare breadcrumbName: string

  @Optional()
  @JsonSchemaArray(Children)
  children?: Array<Omit<Route, 'children'>>
}

export class BreadCrumbProps implements AntBreadcrumbProps {
  // itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode;

  @Optional()
  @Property('string')
  @Description('Routing parameters')
  params?: any

  @Optional()
  @JsonSchemaArray(RouteImpl)
  @Description('The routing stack information of router')
  routes?: Array<Route>

  @Optional()
  @Property('string')
  @Description('Custom separator')
  separator?: React.ReactNode
}

export class BreadcrumbSelectedProps {
  @Property()
  @Enum(VertexType.React_Breadcrumb)
  declare type: string

  @Schema(getJsonSchema(BreadCrumbProps, { customKeys: true }))
  @Title('')
  declare props: object
}
