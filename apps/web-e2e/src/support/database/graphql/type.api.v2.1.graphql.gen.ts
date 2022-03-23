import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type E2eCreatePrimitiveTypesMutationVariables = Types.Exact<{
  input: Array<Types.PrimitiveTypeCreateInput> | Types.PrimitiveTypeCreateInput
}>

export type E2eCreatePrimitiveTypesMutation = {
  createPrimitiveTypes: { primitiveTypes: Array<E2ePrimitiveTypeFragment> }
}

export type E2eCreateArrayTypesMutationVariables = Types.Exact<{
  input: Array<Types.ArrayTypeCreateInput> | Types.ArrayTypeCreateInput
}>

export type E2eCreateArrayTypesMutation = {
  createArrayTypes: { arrayTypes: Array<E2eArrayTypeFragment> }
}

export type E2eCreateUnionTypesMutationVariables = Types.Exact<{
  input: Array<Types.UnionTypeCreateInput> | Types.UnionTypeCreateInput
}>

export type E2eCreateUnionTypesMutation = {
  createUnionTypes: { unionTypes: Array<E2eUnionTypeFragment> }
}

export type E2eCreateInterfaceTypesMutationVariables = Types.Exact<{
  input: Array<Types.InterfaceTypeCreateInput> | Types.InterfaceTypeCreateInput
}>

export type E2eCreateInterfaceTypesMutation = {
  createInterfaceTypes: { interfaceTypes: Array<{}> }
}

export type E2eCreateElementTypesMutationVariables = Types.Exact<{
  input: Array<Types.ElementTypeCreateInput> | Types.ElementTypeCreateInput
}>

export type E2eCreateElementTypesMutation = {
  createElementTypes: { elementTypes: Array<E2eElementTypeFragment> }
}

export type E2eCreateRenderPropsTypesMutationVariables = Types.Exact<{
  input:
    | Array<Types.RenderPropsTypeCreateInput>
    | Types.RenderPropsTypeCreateInput
}>

export type E2eCreateRenderPropsTypesMutation = {
  createRenderPropsTypes: {
    renderPropsTypes: Array<E2eRenderPropsTypeFragment>
  }
}

export type E2eCreateEnumTypesMutationVariables = Types.Exact<{
  input: Array<Types.EnumTypeCreateInput> | Types.EnumTypeCreateInput
}>

export type E2eCreateEnumTypesMutation = {
  createEnumTypes: { enumTypes: Array<E2eEnumTypeFragment> }
}

export type E2eCreateLambdaTypesMutationVariables = Types.Exact<{
  input: Array<Types.LambdaTypeCreateInput> | Types.LambdaTypeCreateInput
}>

export type E2eCreateLambdaTypesMutation = {
  createLambdaTypes: { lambdaTypes: Array<E2eLambdaTypeFragment> }
}

export type E2eCreatePageTypesMutationVariables = Types.Exact<{
  input: Array<Types.PageTypeCreateInput> | Types.PageTypeCreateInput
}>

export type E2eCreatePageTypesMutation = {
  createPageTypes: { pageTypes: Array<E2ePageTypeFragment> }
}

export type E2eCreateAppTypesMutationVariables = Types.Exact<{
  input: Array<Types.AppTypeCreateInput> | Types.AppTypeCreateInput
}>

export type E2eCreateAppTypesMutation = {
  createAppTypes: { appTypes: Array<E2eAppTypeFragment> }
}

export type E2eCreateMonacoTypesMutationVariables = Types.Exact<{
  input: Array<Types.MonacoTypeCreateInput> | Types.MonacoTypeCreateInput
}>

export type E2eCreateMonacoTypesMutation = {
  createMonacoTypes: { monacoTypes: Array<E2eMonacoTypeFragment> }
}

export type E2eCreateReactNodeTypesMutationVariables = Types.Exact<{
  input: Array<Types.ReactNodeCreateInput> | Types.ReactNodeCreateInput
}>

export type E2eCreateReactNodeTypesMutation = {
  createReactNodeTypes: { reactNodeTypes: Array<E2eReactNodeFragment> }
}

export type E2eTypeBase_AppType_Fragment = {
  id: string
  name: string
  typeKind: 'AppType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_ArrayType_Fragment = {
  id: string
  name: string
  typeKind: 'ArrayType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_ElementType_Fragment = {
  id: string
  name: string
  typeKind: 'ElementType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_EnumType_Fragment = {
  id: string
  name: string
  typeKind: 'EnumType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_InterfaceType_Fragment = {
  id: string
  name: string
  typeKind: 'InterfaceType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_LambdaType_Fragment = {
  id: string
  name: string
  typeKind: 'LambdaType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_MonacoType_Fragment = {
  id: string
  name: string
  typeKind: 'MonacoType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_PageType_Fragment = {
  id: string
  name: string
  typeKind: 'PageType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_PrimitiveType_Fragment = {
  id: string
  name: string
  typeKind: 'PrimitiveType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_ReactNodeType_Fragment = {
  id: string
  name: string
  typeKind: 'ReactNodeType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_RenderPropsType_Fragment = {
  id: string
  name: string
  typeKind: 'RenderPropsType'
  owner: Array<{ id: string; auth0Id: string }>
}

export type E2eTypeBase_UnionType_Fragment = {
  id: string
  name: string
  typeKind: 'UnionType'
  owner: Array<{ id: string; auth0Id: string }>
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
  primitiveKind: Types.PrimitiveTypeKind
} & E2eTypeBase_PrimitiveType_Fragment

export type E2eArrayTypeFragment = E2eTypeBase_ArrayType_Fragment

export type E2eUnionTypeFragment = E2eTypeBase_UnionType_Fragment

export type E2eInterfaceTypeFragment = E2eTypeBase_UnionType_Fragment

export type E2eElementTypeFragment = {
  elementKind: Types.ElementTypeKind
} & E2eTypeBase_ElementType_Fragment

export type E2eRenderPropsTypeFragment = E2eTypeBase_RenderPropsType_Fragment

export type E2eEnumTypeFragment = E2eTypeBase_EnumType_Fragment

export type E2eEnumTypeFragment = E2eTypeBase_EnumType_Fragment

export type E2eLambdaTypeFragment = E2eTypeBase_LambdaType_Fragment

export type E2ePageTypeFragment = E2eTypeBase_PageType_Fragment

export type E2eAppTypeFragment = E2eTypeBase_AppType_Fragment

export type E2eMonacoTypeFragment = {
  language: Types.MonacoLanguage
} & E2eTypeBase_MonacoType_Fragment

export type E2eReactNodeFragment = E2eTypeBase_ReactNodeType_Fragment

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
`
export const E2eArrayTypeFragmentDoc = gql`
  fragment E2eArrayType on ArrayType {
    ...E2eTypeBase
  }
`
export const E2eUnionTypeFragmentDoc = gql`
  fragment E2eUnionType on UnionType {
    ...E2eTypeBase
  }
`
export const E2eInterfaceTypeFragmentDoc = gql`
  fragment E2eInterfaceType on UnionType {
    ...E2eTypeBase
  }
`
export const E2eElementTypeFragmentDoc = gql`
  fragment E2eElementType on ElementType {
    ...E2eTypeBase
    elementKind
  }
`
export const E2eRenderPropsTypeFragmentDoc = gql`
  fragment E2eRenderPropsType on RenderPropsType {
    ...E2eTypeBase
  }
`
export const E2eEnumTypeFragmentDoc = gql`
  fragment E2eEnumType on EnumType {
    ...E2eTypeBase
  }
`
export const E2eLambdaTypeFragmentDoc = gql`
  fragment E2eLambdaType on LambdaType {
    ...E2eTypeBase
  }
`
export const E2ePageTypeFragmentDoc = gql`
  fragment E2ePageType on PageType {
    ...E2eTypeBase
  }
`
export const E2eAppTypeFragmentDoc = gql`
  fragment E2eAppType on AppType {
    ...E2eTypeBase
  }
`
export const E2eMonacoTypeFragmentDoc = gql`
  fragment E2eMonacoType on MonacoType {
    ...E2eTypeBase
    language
  }
`
export const E2eReactNodeFragmentDoc = gql`
  fragment E2eReactNode on ReactNodeType {
    ...E2eTypeBase
  }
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
  ${E2eTypeBaseFragmentDoc}
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
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
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
