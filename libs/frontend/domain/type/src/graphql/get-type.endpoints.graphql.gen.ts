import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseType_ActionType_Fragment,
  BaseType_AppType_Fragment,
  BaseType_ArrayType_Fragment,
  BaseType_BaseType_Fragment,
  BaseType_CodeMirrorType_Fragment,
  BaseType_ElementType_Fragment,
  BaseType_EnumType_Fragment,
  BaseType_InterfaceType_Fragment,
  BaseType_LambdaType_Fragment,
  BaseType_PageType_Fragment,
  BaseType_PrimitiveType_Fragment,
  BaseType_ReactNodeType_Fragment,
  BaseType_RenderPropType_Fragment,
  BaseType_UnionType_Fragment,
} from '../../../../abstract/core/src/domain/type/fragments/base-type.fragment.graphql.gen'
import {
  Type_ActionType_Fragment,
  Type_AppType_Fragment,
  Type_ArrayType_Fragment,
  Type_BaseType_Fragment,
  Type_CodeMirrorType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_PageType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropType_Fragment,
  Type_UnionType_Fragment,
} from '../../../../abstract/core/src/domain/type/fragments/type.fragment.graphql.gen'
import { ReactNodeTypeFragment } from '../../../../abstract/core/src/domain/type/fragments/react-node-type.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { BaseTypeFragmentDoc } from '../../../../abstract/core/src/domain/type/fragments/base-type.fragment.graphql.gen'
import { TypeFragmentDoc } from '../../../../abstract/core/src/domain/type/fragments/type.fragment.graphql.gen'
import { ReactNodeTypeFragmentDoc } from '../../../../abstract/core/src/domain/type/fragments/react-node-type.fragment.graphql.gen'
export type GetBaseTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.GetBaseTypesOptions>
}>

export type GetBaseTypesQuery = {
  baseTypes: { totalCount: number; items: Array<BaseType_BaseType_Fragment> }
}

export type GetTypesQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<
    Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input']
  >
}>

export type GetTypesQuery = {
  primitiveTypes: Array<Type_PrimitiveType_Fragment>
  arrayTypes: Array<Type_ArrayType_Fragment>
  unionTypes: Array<Type_UnionType_Fragment>
  interfaceTypes: Array<Type_InterfaceType_Fragment>
  elementTypes: Array<Type_ElementType_Fragment>
  renderPropTypes: Array<Type_RenderPropType_Fragment>
  reactNodeTypes: Array<Type_ReactNodeType_Fragment>
  enumTypes: Array<Type_EnumType_Fragment>
  lambdaTypes: Array<Type_LambdaType_Fragment>
  pageTypes: Array<Type_PageType_Fragment>
  appTypes: Array<Type_AppType_Fragment>
  actionTypes: Array<Type_ActionType_Fragment>
  codeMirrorTypes: Array<Type_CodeMirrorType_Fragment>
}

export type GetDescendantsQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<
    Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input']
  >
}>

export type GetDescendantsQuery = {
  arrayTypes: Array<{ descendantTypesIds: Array<string> }>
  unionTypes: Array<{ descendantTypesIds: Array<string> }>
  interfaceTypes: Array<{ descendantTypesIds: Array<string> }>
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

export type GetRenderPropTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.RenderPropTypeOptions>
  where?: Types.InputMaybe<Types.RenderPropTypeWhere>
}>

export type GetRenderPropTypesQuery = {
  types: Array<Type_RenderPropType_Fragment>
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

export type GetActionTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ActionTypeOptions>
  where?: Types.InputMaybe<Types.ActionTypeWhere>
}>

export type GetActionTypesQuery = { types: Array<Type_ActionType_Fragment> }

export type GetCodeMirrorTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.CodeMirrorTypeOptions>
  where?: Types.InputMaybe<Types.CodeMirrorTypeWhere>
}>

export type GetCodeMirrorTypesQuery = {
  types: Array<Type_CodeMirrorType_Fragment>
}

export type GetTypeOptionsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetTypeOptionsQuery = {
  baseTypes: {
    items: Array<{ id: string; name: string; kind: Types.TypeKind }>
  }
}

export const GetBaseTypesDocument = gql`
  query GetBaseTypes($options: GetBaseTypesOptions) {
    baseTypes(options: $options) {
      totalCount
      items {
        ...BaseType
      }
    }
  }
  ${BaseTypeFragmentDoc}
`
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
    renderPropTypes(where: { id_IN: $ids }) {
      ...Type
    }
    reactNodeTypes(where: { id_IN: $ids }) {
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
    actionTypes(where: { id_IN: $ids }) {
      ...Type
    }
    codeMirrorTypes(where: { id_IN: $ids }) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetDescendantsDocument = gql`
  query GetDescendants($ids: [ID!]) {
    arrayTypes(where: { id_IN: $ids }) {
      descendantTypesIds
    }
    unionTypes(where: { id_IN: $ids }) {
      descendantTypesIds
    }
    interfaceTypes(where: { id_IN: $ids }) {
      descendantTypesIds
    }
  }
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
`
export const GetArrayTypesDocument = gql`
  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
    types: arrayTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetUnionTypesDocument = gql`
  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
    types: unionTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
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
`
export const GetRenderPropTypesDocument = gql`
  query GetRenderPropTypes(
    $options: RenderPropTypeOptions
    $where: RenderPropTypeWhere
  ) {
    types: renderPropTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
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
`
export const GetEnumTypesDocument = gql`
  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
    types: enumTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetLambdaTypesDocument = gql`
  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
    types: lambdaTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetPageTypesDocument = gql`
  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
    types: pageTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetAppTypesDocument = gql`
  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
    types: appTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetActionTypesDocument = gql`
  query GetActionTypes($options: ActionTypeOptions, $where: ActionTypeWhere) {
    types: actionTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetCodeMirrorTypesDocument = gql`
  query GetCodeMirrorTypes(
    $options: CodeMirrorTypeOptions
    $where: CodeMirrorTypeWhere
  ) {
    types: codeMirrorTypes(where: $where, options: $options) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetTypeOptionsDocument = gql`
  query GetTypeOptions {
    baseTypes {
      items {
        id
        name
        kind
      }
    }
  }
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
    GetBaseTypes(
      variables?: GetBaseTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetBaseTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetBaseTypesQuery>(GetBaseTypesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetBaseTypes',
        'query',
      )
    },
    GetTypes(
      variables?: GetTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
    GetDescendants(
      variables?: GetDescendantsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetDescendantsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetDescendantsQuery>(
            GetDescendantsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetDescendants',
        'query',
      )
    },
    GetPrimitiveTypes(
      variables?: GetPrimitiveTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
    GetRenderPropTypes(
      variables?: GetRenderPropTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetRenderPropTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRenderPropTypesQuery>(
            GetRenderPropTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRenderPropTypes',
        'query',
      )
    },
    GetReactNodeTypes(
      variables?: GetReactNodeTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
    GetActionTypes(
      variables?: GetActionTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetActionTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetActionTypesQuery>(
            GetActionTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetActionTypes',
        'query',
      )
    },
    GetCodeMirrorTypes(
      variables?: GetCodeMirrorTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetCodeMirrorTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCodeMirrorTypesQuery>(
            GetCodeMirrorTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetCodeMirrorTypes',
        'query',
      )
    },
    GetTypeOptions(
      variables?: GetTypeOptionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetTypeOptionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTypeOptionsQuery>(
            GetTypeOptionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetTypeOptions',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
