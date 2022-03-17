import * as Types from '@codelab/shared/abstract/codegen-v2'

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
} from './fragments/Type.fragment.v2.1.graphql.gen'
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
} from './fragments/TypeBase.fragment.v2.1.graphql.gen'
import {
  ArrayTypeWithItemTypeFragment,
  ArrayTypeFragment,
} from './fragments/ArrayType.fragment.v2.1.graphql.gen'
import { EnumTypeFragment } from './fragments/EnumType.fragment.v2.1.graphql.gen'
import { EnumTypeValueFragment } from './fragments/EnumTypeValue.fragment.v2.1.graphql.gen'
import {
  InterfaceTypeFragment,
  InterfaceTypeFieldEdgeFragment,
} from './fragments/Interface.fragment.v2.1.graphql.gen'
import { PrimitiveTypeFragment } from './fragments/PrimitiveType.fragment.v2.1.graphql.gen'
import { ElementTypeFragment } from './fragments/ElementType.fragment.v2.1.graphql.gen'
import { LambdaTypeFragment } from './fragments/LambdaType.fragment.v2.1.graphql.gen'
import { RenderPropsTypeFragment } from './fragments/RenderProps.fragment.v2.1.graphql.gen'
import {
  UnionTypeWithInnerTypesFragment,
  UnionTypeFragment,
} from './fragments/UnionType.fragment.v2.1.graphql.gen'
import { MonacoTypeFragment } from './fragments/MonacoType.fragment.v2.1.graphql.gen'
import { PageTypeFragment } from './fragments/PageType.fragment.v2.1.graphql.gen'
import { AppTypeFragment } from './fragments/AppType.fragment.v2.1.graphql.gen'
import { ReactNodeTypeFragment } from './fragments/ReactNodeType.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
import { TypeFragmentDoc } from './fragments/Type.fragment.v2.1.graphql.gen'
import { TypeBaseFragmentDoc } from './fragments/TypeBase.fragment.v2.1.graphql.gen'
import {
  ArrayTypeWithItemTypeFragmentDoc,
  ArrayTypeFragmentDoc,
} from './fragments/ArrayType.fragment.v2.1.graphql.gen'
import { EnumTypeFragmentDoc } from './fragments/EnumType.fragment.v2.1.graphql.gen'
import { EnumTypeValueFragmentDoc } from './fragments/EnumTypeValue.fragment.v2.1.graphql.gen'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeFieldEdgeFragmentDoc,
} from './fragments/Interface.fragment.v2.1.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './fragments/PrimitiveType.fragment.v2.1.graphql.gen'
import { ElementTypeFragmentDoc } from './fragments/ElementType.fragment.v2.1.graphql.gen'
import { LambdaTypeFragmentDoc } from './fragments/LambdaType.fragment.v2.1.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './fragments/RenderProps.fragment.v2.1.graphql.gen'
import {
  UnionTypeWithInnerTypesFragmentDoc,
  UnionTypeFragmentDoc,
} from './fragments/UnionType.fragment.v2.1.graphql.gen'
import { MonacoTypeFragmentDoc } from './fragments/MonacoType.fragment.v2.1.graphql.gen'
import { PageTypeFragmentDoc } from './fragments/PageType.fragment.v2.1.graphql.gen'
import { AppTypeFragmentDoc } from './fragments/AppType.fragment.v2.1.graphql.gen'
import { ReactNodeTypeFragmentDoc } from './fragments/ReactNodeType.fragment.v2.1.graphql.gen'
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

export const GetTypesGql = gql`
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
export const GetPrimitiveTypesGql = gql`
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
export const GetArrayTypesGql = gql`
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
export const GetUnionTypesGql = gql`
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
export const GetInterfaceTypesGql = gql`
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
export const GetElementTypesGql = gql`
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
export const GetRenderPropsTypesGql = gql`
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
export const GetReactNodeTypesGql = gql`
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
export const GetEnumTypesGql = gql`
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
export const GetLambdaTypesGql = gql`
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
export const GetPageTypesGql = gql`
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
export const GetAppTypesGql = gql`
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
export const GetMonacoTypesGql = gql`
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
          client.request<GetTypesQuery>(GetTypesGql, variables, {
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
            GetPrimitiveTypesGql,
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
          client.request<GetArrayTypesQuery>(GetArrayTypesGql, variables, {
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
          client.request<GetUnionTypesQuery>(GetUnionTypesGql, variables, {
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
            GetInterfaceTypesGql,
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
          client.request<GetElementTypesQuery>(GetElementTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
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
            GetRenderPropsTypesGql,
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
            GetReactNodeTypesGql,
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
          client.request<GetEnumTypesQuery>(GetEnumTypesGql, variables, {
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
          client.request<GetLambdaTypesQuery>(GetLambdaTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
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
          client.request<GetPageTypesQuery>(GetPageTypesGql, variables, {
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
          client.request<GetAppTypesQuery>(GetAppTypesGql, variables, {
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
          client.request<GetMonacoTypesQuery>(GetMonacoTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetMonacoTypes',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
