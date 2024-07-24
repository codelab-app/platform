import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const CreatePrimitiveTypesDocument = graphql(`
  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
    types: createPrimitiveTypes(input: $input) {
      types: primitiveTypes {
        id
      }
    }
  }
`)

export const CreateArrayTypesDocument = graphql(`
  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
    types: createArrayTypes(input: $input) {
      types: arrayTypes {
        id
      }
    }
  }
`)

export const CreateUnionTypesDocument = graphql(`
  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
    types: createUnionTypes(input: $input) {
      types: unionTypes {
        id
      }
    }
  }
`)

export const CreateInterfaceTypesDocument = graphql(`
  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
    types: createInterfaceTypes(input: $input) {
      types: interfaceTypes {
        id
      }
    }
  }
`)

export const CreateElementTypesDocument = graphql(`
  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
    types: createElementTypes(input: $input) {
      types: elementTypes {
        id
      }
    }
  }
`)

export const CreateRenderPropTypesDocument = graphql(`
  mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {
    types: createRenderPropTypes(input: $input) {
      types: renderPropTypes {
        id
      }
    }
  }
`)

export const CreateReactNodeTypesDocument = graphql(`
  mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
    types: createReactNodeTypes(input: $input) {
      types: reactNodeTypes {
        id
      }
    }
  }
`)

export const CreateEnumTypesDocument = graphql(`
  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
    types: createEnumTypes(input: $input) {
      types: enumTypes {
        id
      }
    }
  }
`)

export const CreateLambdaTypesDocument = graphql(`
  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
    types: createLambdaTypes(input: $input) {
      types: lambdaTypes {
        id
      }
    }
  }
`)

export const CreatePageTypesDocument = graphql(`
  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
    types: createPageTypes(input: $input) {
      types: pageTypes {
        id
      }
    }
  }
`)

export const CreateAppTypesDocument = graphql(`
  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
    types: createAppTypes(input: $input) {
      types: appTypes {
        id
      }
    }
  }
`)

export const CreateRichTextTypesDocument = graphql(`
  mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {
    types: createRichTextTypes(input: $input) {
      types: richTextTypes {
        id
      }
    }
  }
`)

export const CreateActionTypesDocument = graphql(`
  mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {
    types: createActionTypes(input: $input) {
      types: actionTypes {
        id
      }
    }
  }
`)

export const CreateCodeMirrorTypesDocument = graphql(`
  mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {
    types: createCodeMirrorTypes(input: $input) {
      types: codeMirrorTypes {
        id
      }
    }
  }
`)
import {
  type CreatePrimitiveTypesMutationVariables,
  type CreateArrayTypesMutationVariables,
  type CreateUnionTypesMutationVariables,
  type CreateInterfaceTypesMutationVariables,
  type CreateElementTypesMutationVariables,
  type CreateRenderPropTypesMutationVariables,
  type CreateReactNodeTypesMutationVariables,
  type CreateEnumTypesMutationVariables,
  type CreateLambdaTypesMutationVariables,
  type CreatePageTypesMutationVariables,
  type CreateAppTypesMutationVariables,
  type CreateRichTextTypesMutationVariables,
  type CreateActionTypesMutationVariables,
  type CreateCodeMirrorTypesMutationVariables,
} from '@codelab/frontend/infra/gql'

const CreatePrimitiveTypes = (
  variables: CreatePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreatePrimitiveTypesDocument, variables, next)

const CreateArrayTypes = (
  variables: CreateArrayTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateArrayTypesDocument, variables, next)

const CreateUnionTypes = (
  variables: CreateUnionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateUnionTypesDocument, variables, next)

const CreateInterfaceTypes = (
  variables: CreateInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateInterfaceTypesDocument, variables, next)

const CreateElementTypes = (
  variables: CreateElementTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateElementTypesDocument, variables, next)

const CreateRenderPropTypes = (
  variables: CreateRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateRenderPropTypesDocument, variables, next)

const CreateReactNodeTypes = (
  variables: CreateReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateReactNodeTypesDocument, variables, next)

const CreateEnumTypes = (
  variables: CreateEnumTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateEnumTypesDocument, variables, next)

const CreateLambdaTypes = (
  variables: CreateLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateLambdaTypesDocument, variables, next)

const CreatePageTypes = (
  variables: CreatePageTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreatePageTypesDocument, variables, next)

const CreateAppTypes = (
  variables: CreateAppTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateAppTypesDocument, variables, next)

const CreateRichTextTypes = (
  variables: CreateRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateRichTextTypesDocument, variables, next)

const CreateActionTypes = (
  variables: CreateActionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateActionTypesDocument, variables, next)

const CreateCodeMirrorTypes = (
  variables: CreateCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateCodeMirrorTypesDocument, variables, next)

export const getSdk = () => ({
  CreatePrimitiveTypes,
  CreateArrayTypes,
  CreateUnionTypes,
  CreateInterfaceTypes,
  CreateElementTypes,
  CreateRenderPropTypes,
  CreateReactNodeTypes,
  CreateEnumTypes,
  CreateLambdaTypes,
  CreatePageTypes,
  CreateAppTypes,
  CreateRichTextTypes,
  CreateActionTypes,
  CreateCodeMirrorTypes,
})
