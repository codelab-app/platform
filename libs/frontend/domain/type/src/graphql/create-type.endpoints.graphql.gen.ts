import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type CreatePrimitiveTypesMutationVariables = Types.Exact<{
  input: Array<Types.PrimitiveTypeCreateInput> | Types.PrimitiveTypeCreateInput
}>

export type CreatePrimitiveTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateArrayTypesMutationVariables = Types.Exact<{
  input: Array<Types.ArrayTypeCreateInput> | Types.ArrayTypeCreateInput
}>

export type CreateArrayTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateUnionTypesMutationVariables = Types.Exact<{
  input: Array<Types.UnionTypeCreateInput> | Types.UnionTypeCreateInput
}>

export type CreateUnionTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateInterfaceTypesMutationVariables = Types.Exact<{
  input: Array<Types.InterfaceTypeCreateInput> | Types.InterfaceTypeCreateInput
}>

export type CreateInterfaceTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateElementTypesMutationVariables = Types.Exact<{
  input: Array<Types.ElementTypeCreateInput> | Types.ElementTypeCreateInput
}>

export type CreateElementTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateRenderPropTypesMutationVariables = Types.Exact<{
  input:
    | Array<Types.RenderPropTypeCreateInput>
    | Types.RenderPropTypeCreateInput
}>

export type CreateRenderPropTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateReactNodeTypesMutationVariables = Types.Exact<{
  input: Array<Types.ReactNodeTypeCreateInput> | Types.ReactNodeTypeCreateInput
}>

export type CreateReactNodeTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateEnumTypesMutationVariables = Types.Exact<{
  input: Array<Types.EnumTypeCreateInput> | Types.EnumTypeCreateInput
}>

export type CreateEnumTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateLambdaTypesMutationVariables = Types.Exact<{
  input: Array<Types.LambdaTypeCreateInput> | Types.LambdaTypeCreateInput
}>

export type CreateLambdaTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreatePageTypesMutationVariables = Types.Exact<{
  input: Array<Types.PageTypeCreateInput> | Types.PageTypeCreateInput
}>

export type CreatePageTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateAppTypesMutationVariables = Types.Exact<{
  input: Array<Types.AppTypeCreateInput> | Types.AppTypeCreateInput
}>

export type CreateAppTypesMutation = { types: { types: Array<{ id: string }> } }

export type CreateActionTypesMutationVariables = Types.Exact<{
  input: Array<Types.ActionTypeCreateInput> | Types.ActionTypeCreateInput
}>

export type CreateActionTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export type CreateCodeMirrorTypesMutationVariables = Types.Exact<{
  input:
    | Array<Types.CodeMirrorTypeCreateInput>
    | Types.CodeMirrorTypeCreateInput
}>

export type CreateCodeMirrorTypesMutation = {
  types: { types: Array<{ id: string }> }
}

export const CreatePrimitiveTypesDocument = gql`
  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
    types: createPrimitiveTypes(input: $input) {
      types: primitiveTypes {
        id
      }
    }
  }
`
export const CreateArrayTypesDocument = gql`
  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
    types: createArrayTypes(input: $input) {
      types: arrayTypes {
        id
      }
    }
  }
`
export const CreateUnionTypesDocument = gql`
  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
    types: createUnionTypes(input: $input) {
      types: unionTypes {
        id
      }
    }
  }
`
export const CreateInterfaceTypesDocument = gql`
  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
    types: createInterfaceTypes(input: $input) {
      types: interfaceTypes {
        id
      }
    }
  }
`
export const CreateElementTypesDocument = gql`
  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
    types: createElementTypes(input: $input) {
      types: elementTypes {
        id
      }
    }
  }
`
export const CreateRenderPropTypesDocument = gql`
  mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {
    types: createRenderPropTypes(input: $input) {
      types: renderPropTypes {
        id
      }
    }
  }
`
export const CreateReactNodeTypesDocument = gql`
  mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
    types: createReactNodeTypes(input: $input) {
      types: reactNodeTypes {
        id
      }
    }
  }
`
export const CreateEnumTypesDocument = gql`
  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
    types: createEnumTypes(input: $input) {
      types: enumTypes {
        id
      }
    }
  }
`
export const CreateLambdaTypesDocument = gql`
  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
    types: createLambdaTypes(input: $input) {
      types: lambdaTypes {
        id
      }
    }
  }
`
export const CreatePageTypesDocument = gql`
  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
    types: createPageTypes(input: $input) {
      types: pageTypes {
        id
      }
    }
  }
`
export const CreateAppTypesDocument = gql`
  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
    types: createAppTypes(input: $input) {
      types: appTypes {
        id
      }
    }
  }
`
export const CreateActionTypesDocument = gql`
  mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {
    types: createActionTypes(input: $input) {
      types: actionTypes {
        id
      }
    }
  }
`
export const CreateCodeMirrorTypesDocument = gql`
  mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {
    types: createCodeMirrorTypes(input: $input) {
      types: codeMirrorTypes {
        id
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
    CreatePrimitiveTypes(
      variables: CreatePrimitiveTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePrimitiveTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePrimitiveTypesMutation>(
            CreatePrimitiveTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePrimitiveTypes',
        'mutation',
      )
    },
    CreateArrayTypes(
      variables: CreateArrayTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateArrayTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateArrayTypesMutation>(
            CreateArrayTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateArrayTypes',
        'mutation',
      )
    },
    CreateUnionTypes(
      variables: CreateUnionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateUnionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUnionTypesMutation>(
            CreateUnionTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateUnionTypes',
        'mutation',
      )
    },
    CreateInterfaceTypes(
      variables: CreateInterfaceTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateInterfaceTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateInterfaceTypesMutation>(
            CreateInterfaceTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateInterfaceTypes',
        'mutation',
      )
    },
    CreateElementTypes(
      variables: CreateElementTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateElementTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateElementTypesMutation>(
            CreateElementTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateElementTypes',
        'mutation',
      )
    },
    CreateRenderPropTypes(
      variables: CreateRenderPropTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateRenderPropTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateRenderPropTypesMutation>(
            CreateRenderPropTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateRenderPropTypes',
        'mutation',
      )
    },
    CreateReactNodeTypes(
      variables: CreateReactNodeTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateReactNodeTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateReactNodeTypesMutation>(
            CreateReactNodeTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateReactNodeTypes',
        'mutation',
      )
    },
    CreateEnumTypes(
      variables: CreateEnumTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateEnumTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateEnumTypesMutation>(
            CreateEnumTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateEnumTypes',
        'mutation',
      )
    },
    CreateLambdaTypes(
      variables: CreateLambdaTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateLambdaTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateLambdaTypesMutation>(
            CreateLambdaTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateLambdaTypes',
        'mutation',
      )
    },
    CreatePageTypes(
      variables: CreatePageTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePageTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePageTypesMutation>(
            CreatePageTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePageTypes',
        'mutation',
      )
    },
    CreateAppTypes(
      variables: CreateAppTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateAppTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAppTypesMutation>(
            CreateAppTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateAppTypes',
        'mutation',
      )
    },
    CreateActionTypes(
      variables: CreateActionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateActionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateActionTypesMutation>(
            CreateActionTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateActionTypes',
        'mutation',
      )
    },
    CreateCodeMirrorTypes(
      variables: CreateCodeMirrorTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateCodeMirrorTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateCodeMirrorTypesMutation>(
            CreateCodeMirrorTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateCodeMirrorTypes',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
