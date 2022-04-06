import * as Types from '@codelab/shared/abstract/codegen'

import {
  Type_AppType_Fragment,
  Type_ArrayType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_MonacoType_Fragment,
  Type_PageType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropsType_Fragment,
  Type_UnionType_Fragment,
} from './fragments/type.fragment.graphql.gen'
import {
  TypeBase_AppType_Fragment,
  TypeBase_ArrayType_Fragment,
  TypeBase_ElementType_Fragment,
  TypeBase_EnumType_Fragment,
  TypeBase_InterfaceType_Fragment,
  TypeBase_LambdaType_Fragment,
  TypeBase_MonacoType_Fragment,
  TypeBase_PageType_Fragment,
  TypeBase_PrimitiveType_Fragment,
  TypeBase_ReactNodeType_Fragment,
  TypeBase_RenderPropsType_Fragment,
  TypeBase_UnionType_Fragment,
} from './fragments/type-base.fragment.graphql.gen'
import {
  ArrayTypeWithItemTypeFragment,
  ArrayTypeFragment,
} from './fragments/array-type.fragment.graphql.gen'
import { EnumTypeFragment } from './fragments/enum-type.fragment.graphql.gen'
import { EnumTypeValueFragment } from './fragments/enum-type-value.fragment.graphql.gen'
import {
  InterfaceTypeFragment,
  InterfaceTypeFieldEdgeFragment,
} from './fragments/interface.fragment.graphql.gen'
import { PrimitiveTypeFragment } from './fragments/primitive-type.fragment.graphql.gen'
import { ElementTypeFragment } from './fragments/element-type.fragment.graphql.gen'
import { LambdaTypeFragment } from './fragments/lambda-type.fragment.graphql.gen'
import { RenderPropsTypeFragment } from './fragments/render-props.fragment.graphql.gen'
import {
  UnionTypeWithInnerTypesFragment,
  UnionTypeFragment,
} from './fragments/union-type.fragment.graphql.gen'
import { MonacoTypeFragment } from './fragments/monaco-type.fragment.graphql.gen'
import { PageTypeFragment } from './fragments/page-type.fragment.graphql.gen'
import { AppTypeFragment } from './fragments/app-type.fragment.graphql.gen'
import { ReactNodeTypeFragment } from './fragments/react-node-type.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { TypeFragmentDoc } from './fragments/type.fragment.graphql.gen'
import { TypeBaseFragmentDoc } from './fragments/type-base.fragment.graphql.gen'
import {
  ArrayTypeWithItemTypeFragmentDoc,
  ArrayTypeFragmentDoc,
} from './fragments/array-type.fragment.graphql.gen'
import { EnumTypeFragmentDoc } from './fragments/enum-type.fragment.graphql.gen'
import { EnumTypeValueFragmentDoc } from './fragments/enum-type-value.fragment.graphql.gen'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeFieldEdgeFragmentDoc,
} from './fragments/interface.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './fragments/primitive-type.fragment.graphql.gen'
import { ElementTypeFragmentDoc } from './fragments/element-type.fragment.graphql.gen'
import { LambdaTypeFragmentDoc } from './fragments/lambda-type.fragment.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './fragments/render-props.fragment.graphql.gen'
import {
  UnionTypeWithInnerTypesFragmentDoc,
  UnionTypeFragmentDoc,
} from './fragments/union-type.fragment.graphql.gen'
import { MonacoTypeFragmentDoc } from './fragments/monaco-type.fragment.graphql.gen'
import { PageTypeFragmentDoc } from './fragments/page-type.fragment.graphql.gen'
import { AppTypeFragmentDoc } from './fragments/app-type.fragment.graphql.gen'
import { ReactNodeTypeFragmentDoc } from './fragments/react-node-type.fragment.graphql.gen'
export type GetTypesQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetTypesQuery = {
  primitiveTypes: Array<Type_PrimitiveType_Fragment>
  arrayTypes: Array<Type_ArrayType_Fragment>
  unionTypes: Array<Type_UnionType_Fragment>
  interfaceTypes: Array<Type_InterfaceType_Fragment>
  elementTypes: Array<Type_ElementType_Fragment>
  renderPropsTypes: Array<Type_RenderPropsType_Fragment>
  enumTypes: Array<Type_EnumType_Fragment>
  lambdaTypes: Array<Type_LambdaType_Fragment>
  pageTypes: Array<Type_PageType_Fragment>
  appTypes: Array<Type_AppType_Fragment>
  monacoTypes: Array<Type_MonacoType_Fragment>
}

export type GetPrimitiveTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PrimitiveTypeOptions>
  where?: Types.InputMaybe<Types.PrimitiveTypeWhere>
}>

export type GetPrimitiveTypesQuery = {
  types: Array<Type_PrimitiveType_Fragment>
}

export type GetArrayTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ArrayTypeOptions>
  where?: Types.InputMaybe<Types.ArrayTypeWhere>
}>

export type GetArrayTypesQuery = { types: Array<Type_ArrayType_Fragment> }

export type GetUnionTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.UnionTypeOptions>
  where?: Types.InputMaybe<Types.UnionTypeWhere>
}>

export type GetUnionTypesQuery = { types: Array<Type_UnionType_Fragment> }

export type GetInterfaceTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.InterfaceTypeOptions>
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>
}>

export type GetInterfaceTypesQuery = {
  types: Array<Type_InterfaceType_Fragment>
}

export type GetElementTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementTypeOptions>
  where?: Types.InputMaybe<Types.ElementTypeWhere>
}>

export type GetElementTypesQuery = { types: Array<Type_ElementType_Fragment> }

export type GetRenderPropsTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.RenderPropsTypeOptions>
  where?: Types.InputMaybe<Types.RenderPropsTypeWhere>
}>

export type GetRenderPropsTypesQuery = {
  types: Array<Type_RenderPropsType_Fragment>
}

export type GetReactNodeTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ReactNodeTypeOptions>
  where?: Types.InputMaybe<Types.ReactNodeTypeWhere>
}>

export type GetReactNodeTypesQuery = { types: Array<ReactNodeTypeFragment> }

export type GetEnumTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.EnumTypeOptions>
  where?: Types.InputMaybe<Types.EnumTypeWhere>
}>

export type GetEnumTypesQuery = { types: Array<Type_EnumType_Fragment> }

export type GetLambdaTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.LambdaTypeOptions>
  where?: Types.InputMaybe<Types.LambdaTypeWhere>
}>

export type GetLambdaTypesQuery = { types: Array<Type_LambdaType_Fragment> }

export type GetPageTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PageTypeOptions>
  where?: Types.InputMaybe<Types.PageTypeWhere>
}>

export type GetPageTypesQuery = { types: Array<Type_PageType_Fragment> }

export type GetAppTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppTypeOptions>
  where?: Types.InputMaybe<Types.AppTypeWhere>
}>

export type GetAppTypesQuery = { types: Array<Type_AppType_Fragment> }

export type GetMonacoTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.MonacoTypeOptions>
  where?: Types.InputMaybe<Types.MonacoTypeWhere>
}>

export type GetMonacoTypesQuery = { types: Array<Type_MonacoType_Fragment> }

export const GetTypesDocument = gql`
  query GetTypes($ids: [ID!]) {
    primitiveTypes(where: { id_IN: $ids }) {
      ...Type
    }
    arrayTypes(where: { id_IN: $ids }) {
      ...Type
    }
    unionTypes(where: { id_IN: $ids }) {
      ...Type
    }
    interfaceTypes(where: { id_IN: $ids }) {
      ...Type
    }
    elementTypes(where: { id_IN: $ids }) {
      ...Type
    }
    renderPropsTypes(where: { id_IN: $ids }) {
      ...Type
    }
    enumTypes(where: { id_IN: $ids }) {
      ...Type
    }
    lambdaTypes(where: { id_IN: $ids }) {
      ...Type
    }
    pageTypes(where: { id_IN: $ids }) {
      ...Type
    }
    appTypes(where: { id_IN: $ids }) {
      ...Type
    }
    monacoTypes(where: { id_IN: $ids }) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetPrimitiveTypesDocument = gql`
  query GetPrimitiveTypes(
    $options: PrimitiveTypeOptions
    $where: PrimitiveTypeWhere
  ) {
    types: primitiveTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetArrayTypesDocument = gql`
  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
    types: arrayTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetUnionTypesDocument = gql`
  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
    types: unionTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetInterfaceTypesDocument = gql`
  query GetInterfaceTypes(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetElementTypesDocument = gql`
  query GetElementTypes(
    $options: ElementTypeOptions
    $where: ElementTypeWhere
  ) {
    types: elementTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetRenderPropsTypesDocument = gql`
  query GetRenderPropsTypes(
    $options: RenderPropsTypeOptions
    $where: RenderPropsTypeWhere
  ) {
    types: renderPropsTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetReactNodeTypesDocument = gql`
  query GetReactNodeTypes(
    $options: ReactNodeTypeOptions
    $where: ReactNodeTypeWhere
  ) {
    types: reactNodeTypes(where: $where, options: $options) {
      ...ReactNodeType
    }
  }
  ${ReactNodeTypeFragmentDoc}
  ${TypeBaseFragmentDoc}
`
export const GetEnumTypesDocument = gql`
  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
    types: enumTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetLambdaTypesDocument = gql`
  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
    types: lambdaTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetPageTypesDocument = gql`
  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
    types: pageTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetAppTypesDocument = gql`
  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
    types: appTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const GetMonacoTypesDocument = gql`
  query GetMonacoTypes($options: MonacoTypeOptions, $where: MonacoTypeWhere) {
    types: monacoTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetTypes(
      variables?: GetTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTypesQuery>(GetTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetTypes',
        'query',
      )
    },
    GetPrimitiveTypes(
      variables?: GetPrimitiveTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPrimitiveTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPrimitiveTypesQuery>(
            GetPrimitiveTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetPrimitiveTypes',
        'query',
      )
    },
    GetArrayTypes(
      variables?: GetArrayTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetArrayTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetArrayTypesQuery>(GetArrayTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetArrayTypes',
        'query',
      )
    },
    GetUnionTypes(
      variables?: GetUnionTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetUnionTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUnionTypesQuery>(GetUnionTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUnionTypes',
        'query',
      )
    },
    GetInterfaceTypes(
      variables?: GetInterfaceTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetInterfaceTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetInterfaceTypesQuery>(
            GetInterfaceTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetInterfaceTypes',
        'query',
      )
    },
    GetElementTypes(
      variables?: GetElementTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementTypesQuery>(
            GetElementTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetElementTypes',
        'query',
      )
    },
    GetRenderPropsTypes(
      variables?: GetRenderPropsTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetRenderPropsTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRenderPropsTypesQuery>(
            GetRenderPropsTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRenderPropsTypes',
        'query',
      )
    },
    GetReactNodeTypes(
      variables?: GetReactNodeTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetReactNodeTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetReactNodeTypesQuery>(
            GetReactNodeTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetReactNodeTypes',
        'query',
      )
    },
    GetEnumTypes(
      variables?: GetEnumTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetEnumTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetEnumTypesQuery>(GetEnumTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetEnumTypes',
        'query',
      )
    },
    GetLambdaTypes(
      variables?: GetLambdaTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetLambdaTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetLambdaTypesQuery>(
            GetLambdaTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetLambdaTypes',
        'query',
      )
    },
    GetPageTypes(
      variables?: GetPageTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPageTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPageTypesQuery>(GetPageTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetPageTypes',
        'query',
      )
    },
    GetAppTypes(
      variables?: GetAppTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAppTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAppTypesQuery>(GetAppTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetAppTypes',
        'query',
      )
    },
    GetMonacoTypes(
      variables?: GetMonacoTypesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetMonacoTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetMonacoTypesQuery>(
            GetMonacoTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetMonacoTypes',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
