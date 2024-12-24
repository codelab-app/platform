import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'

export const CreatePrimitiveTypesDocument = graphql(`
  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
    types: createPrimitiveTypes(input: $input) {
      types: primitiveTypes {
        __typename
        __typename
        id
      }
    }
  }
`)

export const CreateArrayTypesDocument = graphql(`
  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
    types: createArrayTypes(input: $input) {
      types: arrayTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateUnionTypesDocument = graphql(`
  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
    types: createUnionTypes(input: $input) {
      types: unionTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateInterfaceTypesDocument = graphql(`
  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
    types: createInterfaceTypes(input: $input) {
      types: interfaceTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateElementTypesDocument = graphql(`
  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
    types: createElementTypes(input: $input) {
      types: elementTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateRenderPropTypesDocument = graphql(`
  mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {
    types: createRenderPropTypes(input: $input) {
      types: renderPropTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateReactNodeTypesDocument = graphql(`
  mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
    types: createReactNodeTypes(input: $input) {
      types: reactNodeTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateEnumTypesDocument = graphql(`
  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
    types: createEnumTypes(input: $input) {
      types: enumTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateLambdaTypesDocument = graphql(`
  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
    types: createLambdaTypes(input: $input) {
      types: lambdaTypes {
        __typename
        id
      }
    }
  }
`)

export const CreatePageTypesDocument = graphql(`
  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
    types: createPageTypes(input: $input) {
      types: pageTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateAppTypesDocument = graphql(`
  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
    types: createAppTypes(input: $input) {
      types: appTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateRichTextTypesDocument = graphql(`
  mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {
    types: createRichTextTypes(input: $input) {
      types: richTextTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateActionTypesDocument = graphql(`
  mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {
    types: createActionTypes(input: $input) {
      types: actionTypes {
        __typename
        id
      }
    }
  }
`)

export const CreateCodeMirrorTypesDocument = graphql(`
  mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {
    types: createCodeMirrorTypes(input: $input) {
      types: codeMirrorTypes {
        __typename
        id
      }
    }
  }
`)
