import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type E2eCreatePrimitiveTypesMutationVariables = Types.Exact<{
  input: Array<Types.PrimitiveTypeCreateInput> | Types.PrimitiveTypeCreateInput
}>

export type E2eCreatePrimitiveTypesMutation = {
  __typename?: 'Mutation'
  createPrimitiveTypes: {
    __typename?: 'CreatePrimitiveTypesMutationResponse'
    primitiveTypes: Array<{
      __typename?: 'PrimitiveType'
      primitiveKind: Types.PrimitiveTypeKind
      id: string
      name: string
      typeKind: 'PrimitiveType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateArrayTypesMutationVariables = Types.Exact<{
  input: Array<Types.ArrayTypeCreateInput> | Types.ArrayTypeCreateInput
}>

export type E2eCreateArrayTypesMutation = {
  __typename?: 'Mutation'
  createArrayTypes: {
    __typename?: 'CreateArrayTypesMutationResponse'
    arrayTypes: Array<{
      __typename?: 'ArrayType'
      id: string
      name: string
      typeKind: 'ArrayType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateUnionTypesMutationVariables = Types.Exact<{
  input: Array<Types.UnionTypeCreateInput> | Types.UnionTypeCreateInput
}>

export type E2eCreateUnionTypesMutation = {
  __typename?: 'Mutation'
  createUnionTypes: {
    __typename?: 'CreateUnionTypesMutationResponse'
    unionTypes: Array<{
      __typename?: 'UnionType'
      id: string
      name: string
      typeKind: 'UnionType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateInterfaceTypesMutationVariables = Types.Exact<{
  input: Array<Types.InterfaceTypeCreateInput> | Types.InterfaceTypeCreateInput
}>

export type E2eCreateInterfaceTypesMutation = {
  __typename?: 'Mutation'
  createInterfaceTypes: {
    __typename?: 'CreateInterfaceTypesMutationResponse'
    interfaceTypes: Array<{ __typename?: 'InterfaceType' }>
  }
}

export type E2eCreateElementTypesMutationVariables = Types.Exact<{
  input: Array<Types.ElementTypeCreateInput> | Types.ElementTypeCreateInput
}>

export type E2eCreateElementTypesMutation = {
  __typename?: 'Mutation'
  createElementTypes: {
    __typename?: 'CreateElementTypesMutationResponse'
    elementTypes: Array<{
      __typename?: 'ElementType'
      elementKind: Types.ElementTypeKind
      id: string
      name: string
      typeKind: 'ElementType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateRenderPropsTypesMutationVariables = Types.Exact<{
  input:
    | Array<Types.RenderPropsTypeCreateInput>
    | Types.RenderPropsTypeCreateInput
}>

export type E2eCreateRenderPropsTypesMutation = {
  __typename?: 'Mutation'
  createRenderPropsTypes: {
    __typename?: 'CreateRenderPropsTypesMutationResponse'
    renderPropsTypes: Array<{
      __typename?: 'RenderPropsType'
      id: string
      name: string
      typeKind: 'RenderPropsType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateEnumTypesMutationVariables = Types.Exact<{
  input: Array<Types.EnumTypeCreateInput> | Types.EnumTypeCreateInput
}>

export type E2eCreateEnumTypesMutation = {
  __typename?: 'Mutation'
  createEnumTypes: {
    __typename?: 'CreateEnumTypesMutationResponse'
    enumTypes: Array<{
      __typename?: 'EnumType'
      id: string
      name: string
      typeKind: 'EnumType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateLambdaTypesMutationVariables = Types.Exact<{
  input: Array<Types.LambdaTypeCreateInput> | Types.LambdaTypeCreateInput
}>

export type E2eCreateLambdaTypesMutation = {
  __typename?: 'Mutation'
  createLambdaTypes: {
    __typename?: 'CreateLambdaTypesMutationResponse'
    lambdaTypes: Array<{
      __typename?: 'LambdaType'
      id: string
      name: string
      typeKind: 'LambdaType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreatePageTypesMutationVariables = Types.Exact<{
  input: Array<Types.PageTypeCreateInput> | Types.PageTypeCreateInput
}>

export type E2eCreatePageTypesMutation = {
  __typename?: 'Mutation'
  createPageTypes: {
    __typename?: 'CreatePageTypesMutationResponse'
    pageTypes: Array<{
      __typename?: 'PageType'
      id: string
      name: string
      typeKind: 'PageType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateAppTypesMutationVariables = Types.Exact<{
  input: Array<Types.AppTypeCreateInput> | Types.AppTypeCreateInput
}>

export type E2eCreateAppTypesMutation = {
  __typename?: 'Mutation'
  createAppTypes: {
    __typename?: 'CreateAppTypesMutationResponse'
    appTypes: Array<{
      __typename?: 'AppType'
      id: string
      name: string
      typeKind: 'AppType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateMonacoTypesMutationVariables = Types.Exact<{
  input: Array<Types.MonacoTypeCreateInput> | Types.MonacoTypeCreateInput
}>

export type E2eCreateMonacoTypesMutation = {
  __typename?: 'Mutation'
  createMonacoTypes: {
    __typename?: 'CreateMonacoTypesMutationResponse'
    monacoTypes: Array<{
      __typename?: 'MonacoType'
      language: Types.MonacoLanguage
      id: string
      name: string
      typeKind: 'MonacoType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eCreateReactNodeTypesMutationVariables = Types.Exact<{
  input: Array<Types.ReactNodeCreateInput> | Types.ReactNodeCreateInput
}>

export type E2eCreateReactNodeTypesMutation = {
  __typename?: 'Mutation'
  createReactNodeTypes: {
    __typename?: 'CreateReactNodeTypesMutationResponse'
    reactNodeTypes: Array<{
      __typename?: 'ReactNodeType'
      id: string
      name: string
      typeKind: 'ReactNodeType'
      owner?:
        | { __typename?: 'User'; id: string; auth0Id: string }
        | null
        | undefined
    }>
  }
}

export type E2eTypeBase_AppType_Fragment = {
  __typename?: 'AppType'
  id: string
  name: string
  typeKind: 'AppType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_ArrayType_Fragment = {
  __typename?: 'ArrayType'
  id: string
  name: string
  typeKind: 'ArrayType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_ElementType_Fragment = {
  __typename?: 'ElementType'
  id: string
  name: string
  typeKind: 'ElementType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_EnumType_Fragment = {
  __typename?: 'EnumType'
  id: string
  name: string
  typeKind: 'EnumType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_InterfaceType_Fragment = {
  __typename?: 'InterfaceType'
  id: string
  name: string
  typeKind: 'InterfaceType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_LambdaType_Fragment = {
  __typename?: 'LambdaType'
  id: string
  name: string
  typeKind: 'LambdaType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_MonacoType_Fragment = {
  __typename?: 'MonacoType'
  id: string
  name: string
  typeKind: 'MonacoType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_PageType_Fragment = {
  __typename?: 'PageType'
  id: string
  name: string
  typeKind: 'PageType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_PrimitiveType_Fragment = {
  __typename?: 'PrimitiveType'
  id: string
  name: string
  typeKind: 'PrimitiveType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_ReactNodeType_Fragment = {
  __typename?: 'ReactNodeType'
  id: string
  name: string
  typeKind: 'ReactNodeType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_RenderPropsType_Fragment = {
  __typename?: 'RenderPropsType'
  id: string
  name: string
  typeKind: 'RenderPropsType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBase_UnionType_Fragment = {
  __typename?: 'UnionType'
  id: string
  name: string
  typeKind: 'UnionType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eTypeBaseFragment =
  | E2eTypeBase_AppType_Fragment
  | E2eTypeBase_ArrayType_Fragment
  | E2eTypeBase_ElementType_Fragment
  | E2eTypeBase_EnumType_Fragment
  | E2eTypeBase_InterfaceType_Fragment
  | E2eTypeBase_LambdaType_Fragment
  | E2eTypeBase_MonacoType_Fragment
  | E2eTypeBase_PageType_Fragment
  | E2eTypeBase_PrimitiveType_Fragment
  | E2eTypeBase_ReactNodeType_Fragment
  | E2eTypeBase_RenderPropsType_Fragment
  | E2eTypeBase_UnionType_Fragment

export type E2ePrimitiveTypeFragment = {
  __typename?: 'PrimitiveType'
  primitiveKind: Types.PrimitiveTypeKind
  id: string
  name: string
  typeKind: 'PrimitiveType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eArrayTypeFragment = {
  __typename?: 'ArrayType'
  id: string
  name: string
  typeKind: 'ArrayType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eUnionTypeFragment = {
  __typename?: 'UnionType'
  id: string
  name: string
  typeKind: 'UnionType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eInterfaceTypeFragment = {
  __typename?: 'UnionType'
  id: string
  name: string
  typeKind: 'UnionType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eElementTypeFragment = {
  __typename?: 'ElementType'
  elementKind: Types.ElementTypeKind
  id: string
  name: string
  typeKind: 'ElementType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eRenderPropsTypeFragment = {
  __typename?: 'RenderPropsType'
  id: string
  name: string
  typeKind: 'RenderPropsType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eEnumTypeFragment = {
  __typename?: 'EnumType'
  id: string
  name: string
  typeKind: 'EnumType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eEnumTypeFragment = {
  __typename?: 'EnumType'
  id: string
  name: string
  typeKind: 'EnumType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eLambdaTypeFragment = {
  __typename?: 'LambdaType'
  id: string
  name: string
  typeKind: 'LambdaType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2ePageTypeFragment = {
  __typename?: 'PageType'
  id: string
  name: string
  typeKind: 'PageType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eAppTypeFragment = {
  __typename?: 'AppType'
  id: string
  name: string
  typeKind: 'AppType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eMonacoTypeFragment = {
  __typename?: 'MonacoType'
  language: Types.MonacoLanguage
  id: string
  name: string
  typeKind: 'MonacoType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export type E2eReactNodeFragment = {
  __typename?: 'ReactNodeType'
  id: string
  name: string
  typeKind: 'ReactNodeType'
  owner?:
    | { __typename?: 'User'; id: string; auth0Id: string }
    | null
    | undefined
}

export const E2eTypeBaseFragmentDoc = gql`
  fragment E2eTypeBase on TypeBase {
    typeKind: __typename
    id
    owner {
      id
      auth0Id
    }
    name
  }
`
export const E2ePrimitiveTypeFragmentDoc = gql`
  fragment E2ePrimitiveType on PrimitiveType {
    ...E2eTypeBase
    primitiveKind
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eArrayTypeFragmentDoc = gql`
  fragment E2eArrayType on ArrayType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eUnionTypeFragmentDoc = gql`
  fragment E2eUnionType on UnionType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eInterfaceTypeFragmentDoc = gql`
  fragment E2eInterfaceType on UnionType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eElementTypeFragmentDoc = gql`
  fragment E2eElementType on ElementType {
    ...E2eTypeBase
    elementKind
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eRenderPropsTypeFragmentDoc = gql`
  fragment E2eRenderPropsType on RenderPropsType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eEnumTypeFragmentDoc = gql`
  fragment E2eEnumType on EnumType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eLambdaTypeFragmentDoc = gql`
  fragment E2eLambdaType on LambdaType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2ePageTypeFragmentDoc = gql`
  fragment E2ePageType on PageType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eAppTypeFragmentDoc = gql`
  fragment E2eAppType on AppType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eMonacoTypeFragmentDoc = gql`
  fragment E2eMonacoType on MonacoType {
    ...E2eTypeBase
    language
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eReactNodeFragmentDoc = gql`
  fragment E2eReactNode on ReactNodeType {
    ...E2eTypeBase
  }
  ${E2eTypeBaseFragmentDoc}
`
export const E2eCreatePrimitiveTypesDocument = gql`
  mutation E2eCreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
    createPrimitiveTypes(input: $input) {
      primitiveTypes {
        ...E2ePrimitiveType
      }
    }
  }
  ${E2ePrimitiveTypeFragmentDoc}
`
export const E2eCreateArrayTypesDocument = gql`
  mutation E2eCreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
    createArrayTypes(input: $input) {
      arrayTypes {
        ...E2eArrayType
      }
    }
  }
  ${E2eArrayTypeFragmentDoc}
`
export const E2eCreateUnionTypesDocument = gql`
  mutation E2eCreateUnionTypes($input: [UnionTypeCreateInput!]!) {
    createUnionTypes(input: $input) {
      unionTypes {
        ...E2eUnionType
      }
    }
  }
  ${E2eUnionTypeFragmentDoc}
`
export const E2eCreateInterfaceTypesDocument = gql`
  mutation E2eCreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
    createInterfaceTypes(input: $input) {
      interfaceTypes {
        ...E2eInterfaceType
      }
    }
  }
  ${E2eInterfaceTypeFragmentDoc}
`
export const E2eCreateElementTypesDocument = gql`
  mutation E2eCreateElementTypes($input: [ElementTypeCreateInput!]!) {
    createElementTypes(input: $input) {
      elementTypes {
        ...E2eElementType
      }
    }
  }
  ${E2eElementTypeFragmentDoc}
`
export const E2eCreateRenderPropsTypesDocument = gql`
  mutation E2eCreateRenderPropsTypes($input: [RenderPropsTypeCreateInput!]!) {
    createRenderPropsTypes(input: $input) {
      renderPropsTypes {
        ...E2eRenderPropsType
      }
    }
  }
  ${E2eRenderPropsTypeFragmentDoc}
`
export const E2eCreateEnumTypesDocument = gql`
  mutation E2eCreateEnumTypes($input: [EnumTypeCreateInput!]!) {
    createEnumTypes(input: $input) {
      enumTypes {
        ...E2eEnumType
      }
    }
  }
  ${E2eEnumTypeFragmentDoc}
`
export const E2eCreateLambdaTypesDocument = gql`
  mutation E2eCreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
    createLambdaTypes(input: $input) {
      lambdaTypes {
        ...E2eLambdaType
      }
    }
  }
  ${E2eLambdaTypeFragmentDoc}
`
export const E2eCreatePageTypesDocument = gql`
  mutation E2eCreatePageTypes($input: [PageTypeCreateInput!]!) {
    createPageTypes(input: $input) {
      pageTypes {
        ...E2ePageType
      }
    }
  }
  ${E2ePageTypeFragmentDoc}
`
export const E2eCreateAppTypesDocument = gql`
  mutation E2eCreateAppTypes($input: [AppTypeCreateInput!]!) {
    createAppTypes(input: $input) {
      appTypes {
        ...E2eAppType
      }
    }
  }
  ${E2eAppTypeFragmentDoc}
`
export const E2eCreateMonacoTypesDocument = gql`
  mutation E2eCreateMonacoTypes($input: [MonacoTypeCreateInput!]!) {
    createMonacoTypes(input: $input) {
      monacoTypes {
        ...E2eMonacoType
      }
    }
  }
  ${E2eMonacoTypeFragmentDoc}
`
export const E2eCreateReactNodeTypesDocument = gql`
  mutation E2eCreateReactNodeTypes($input: [ReactNodeCreateInput!]!) {
    createReactNodeTypes(input: $input) {
      reactNodeTypes {
        ...E2eReactNode
      }
    }
  }
  ${E2eReactNodeFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    E2eCreatePrimitiveTypes(
      variables: E2eCreatePrimitiveTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreatePrimitiveTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreatePrimitiveTypesMutation>(
            E2eCreatePrimitiveTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreatePrimitiveTypes',
      )
    },
    E2eCreateArrayTypes(
      variables: E2eCreateArrayTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateArrayTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateArrayTypesMutation>(
            E2eCreateArrayTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateArrayTypes',
      )
    },
    E2eCreateUnionTypes(
      variables: E2eCreateUnionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateUnionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateUnionTypesMutation>(
            E2eCreateUnionTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateUnionTypes',
      )
    },
    E2eCreateInterfaceTypes(
      variables: E2eCreateInterfaceTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateInterfaceTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateInterfaceTypesMutation>(
            E2eCreateInterfaceTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateInterfaceTypes',
      )
    },
    E2eCreateElementTypes(
      variables: E2eCreateElementTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateElementTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateElementTypesMutation>(
            E2eCreateElementTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateElementTypes',
      )
    },
    E2eCreateRenderPropsTypes(
      variables: E2eCreateRenderPropsTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateRenderPropsTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateRenderPropsTypesMutation>(
            E2eCreateRenderPropsTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateRenderPropsTypes',
      )
    },
    E2eCreateEnumTypes(
      variables: E2eCreateEnumTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateEnumTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateEnumTypesMutation>(
            E2eCreateEnumTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateEnumTypes',
      )
    },
    E2eCreateLambdaTypes(
      variables: E2eCreateLambdaTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateLambdaTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateLambdaTypesMutation>(
            E2eCreateLambdaTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateLambdaTypes',
      )
    },
    E2eCreatePageTypes(
      variables: E2eCreatePageTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreatePageTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreatePageTypesMutation>(
            E2eCreatePageTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreatePageTypes',
      )
    },
    E2eCreateAppTypes(
      variables: E2eCreateAppTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateAppTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateAppTypesMutation>(
            E2eCreateAppTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateAppTypes',
      )
    },
    E2eCreateMonacoTypes(
      variables: E2eCreateMonacoTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateMonacoTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateMonacoTypesMutation>(
            E2eCreateMonacoTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateMonacoTypes',
      )
    },
    E2eCreateReactNodeTypes(
      variables: E2eCreateReactNodeTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateReactNodeTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateReactNodeTypesMutation>(
            E2eCreateReactNodeTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateReactNodeTypes',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
