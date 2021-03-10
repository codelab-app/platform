import { VertexType } from '@prisma/client'
import { Enum, getJsonSchema, Property, Schema, Title, } from '@tsed/schema'
import { Omit } from 'antd/lib/_util/type'
import { BreadcrumbProps as AntBreadcrumbProps } from 'antd/lib/breadcrumb'
import { Route } from 'antd/lib/breadcrumb/Breadcrumb'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
class Children {

  @RjsfGridProp({
    title: 'Path',
    required: true,
    row: 0,
    span: 24,
  })
  declare path: string

  @RjsfGridProp({
    title: 'Breadcrumb Name',
    required: true,
    row: 1,
    span: 24,
  })
  declare breadcrumbName: string
}

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
class RouteImpl implements Route {

  @RjsfGridProp({
    title: 'Path',
    required: true,
    row: 0,
    span: 24,
  })
  declare path: string

  @RjsfGridProp({
    title: 'Breadcrumb Name',
    required: true,
    row: 1,
    span: 24,
  })
  declare breadcrumbName: string

  @RjsfGridProp({
    title: 'Children',
    isArray: true,
    clazz: Children,
    row: 2,
    span: 24,
  })
  children?: Array<Omit<Route, 'children'>>
}

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class BreadCrumbProps implements AntBreadcrumbProps {
  // itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode;

  @RjsfGridProp({
    title: 'Params',
    description: 'Routing parameters',
    type: 'string',
    row: 0,
    span: 24,
  })
  params?: any

  @RjsfGridProp({
    title: 'Routes',
    description: 'The routing stack information of router',
    isArray: true,
    clazz: RouteImpl,
    row: 1,
    span: 24,
  })
  routes?: Array<Route>

  @RjsfGridProp({
    title: 'Separator',
    description: 'Custom separator',
    type: 'string',
    row: 2,
    span: 24,
  })
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
