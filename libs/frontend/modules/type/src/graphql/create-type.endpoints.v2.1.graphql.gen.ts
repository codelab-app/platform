import * as Types from '@codelab/shared/abstract/codegen-v2'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  AppTypeFragment,
  AppTypeFragmentDoc,
} from './fragments/app-type.fragment.v2.1.graphql.gen'
import {
  ArrayTypeFragment,
  ArrayTypeFragmentDoc,
  ArrayTypeWithItemTypeFragment,
  ArrayTypeWithItemTypeFragmentDoc,
} from './fragments/array-type.fragment.v2.1.graphql.gen'
import {
  ElementTypeFragment,
  ElementTypeFragmentDoc,
} from './fragments/element-type.fragment.v2.1.graphql.gen'
import {
  EnumTypeFragment,
  EnumTypeFragmentDoc,
} from './fragments/enum-type.fragment.v2.1.graphql.gen'
import {
  EnumTypeValueFragment,
  EnumTypeValueFragmentDoc,
} from './fragments/enum-type-value.fragment.v2.1.graphql.gen'
import {
  InterfaceTypeFieldEdgeFragment,
  InterfaceTypeFieldEdgeFragmentDoc,
  InterfaceTypeFragment,
  InterfaceTypeFragmentDoc,
} from './fragments/interface.fragment.v2.1.graphql.gen'
import {
  LambdaTypeFragment,
  LambdaTypeFragmentDoc,
} from './fragments/lambda-type.fragment.v2.1.graphql.gen'
import {
  MonacoTypeFragment,
  MonacoTypeFragmentDoc,
} from './fragments/monaco-type.fragment.v2.1.graphql.gen'
import {
  PageTypeFragment,
  PageTypeFragmentDoc,
} from './fragments/page-type.fragment.v2.1.graphql.gen'
import {
  PrimitiveTypeFragment,
  PrimitiveTypeFragmentDoc,
} from './fragments/primitive-type.fragment.v2.1.graphql.gen'
import {
  RenderPropsTypeFragment,
  RenderPropsTypeFragmentDoc,
} from './fragments/render-props.fragment.v2.1.graphql.gen'
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
  TypeFragmentDoc,
} from './fragments/type.fragment.v2.1.graphql.gen'
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
  TypeBaseFragmentDoc,
} from './fragments/type-base.fragment.v2.1.graphql.gen'
import {
  UnionTypeFragment,
  UnionTypeFragmentDoc,
  UnionTypeWithInnerTypesFragment,
  UnionTypeWithInnerTypesFragmentDoc,
} from './fragments/union-type.fragment.v2.1.graphql.gen'

export type CreatePrimitiveTypesMutationVariables = Types.Exact<{
  input: Array<Types.PrimitiveTypeCreateInput> | Types.PrimitiveTypeCreateInput
}>

export type CreatePrimitiveTypesMutation = {
  types: { types: Array<Type_PrimitiveType_Fragment> }
}

export type CreateArrayTypesMutationVariables = Types.Exact<{
  input: Array<Types.ArrayTypeCreateInput> | Types.ArrayTypeCreateInput
}>

export type CreateArrayTypesMutation = {
  types: { types: Array<Type_ArrayType_Fragment> }
}

export type CreateUnionTypesMutationVariables = Types.Exact<{
  input: Array<Types.UnionTypeCreateInput> | Types.UnionTypeCreateInput
}>

export type CreateUnionTypesMutation = {
  types: { types: Array<Type_UnionType_Fragment> }
}

export type CreateInterfaceTypesMutationVariables = Types.Exact<{
  input: Array<Types.InterfaceTypeCreateInput> | Types.InterfaceTypeCreateInput
}>

export type CreateInterfaceTypesMutation = {
  types: { types: Array<Type_InterfaceType_Fragment> }
}

export type CreateElementTypesMutationVariables = Types.Exact<{
  input: Array<Types.ElementTypeCreateInput> | Types.ElementTypeCreateInput
}>

export type CreateElementTypesMutation = {
  types: { types: Array<Type_ElementType_Fragment> }
}

export type CreateRenderPropsTypesMutationVariables = Types.Exact<{
  input:
    | Array<Types.RenderPropsTypeCreateInput>
    | Types.RenderPropsTypeCreateInput
}>

export type CreateRenderPropsTypesMutation = {
  types: { types: Array<Type_RenderPropsType_Fragment> }
}

export type CreateReactNodeTypesMutationVariables = Types.Exact<{
  input: Array<Types.ReactNodeTypeCreateInput> | Types.ReactNodeTypeCreateInput
}>

export type CreateReactNodeTypesMutation = {
  types: { types: Array<Type_ReactNodeType_Fragment> }
}

export type CreateEnumTypesMutationVariables = Types.Exact<{
  input: Array<Types.EnumTypeCreateInput> | Types.EnumTypeCreateInput
}>

export type CreateEnumTypesMutation = {
  types: { types: Array<Type_EnumType_Fragment> }
}

export type CreateLambdaTypesMutationVariables = Types.Exact<{
  input: Array<Types.LambdaTypeCreateInput> | Types.LambdaTypeCreateInput
}>

export type CreateLambdaTypesMutation = {
  types: { types: Array<Type_LambdaType_Fragment> }
}

export type CreatePageTypesMutationVariables = Types.Exact<{
  input: Array<Types.PageTypeCreateInput> | Types.PageTypeCreateInput
}>

export type CreatePageTypesMutation = {
  types: { types: Array<Type_PageType_Fragment> }
}

export type CreateAppTypesMutationVariables = Types.Exact<{
  input: Array<Types.AppTypeCreateInput> | Types.AppTypeCreateInput
}>

export type CreateAppTypesMutation = {
  types: { types: Array<Type_AppType_Fragment> }
}

export type CreateMonacoTypesMutationVariables = Types.Exact<{
  input: Array<Types.MonacoTypeCreateInput> | Types.MonacoTypeCreateInput
}>

export type CreateMonacoTypesMutation = {
  types: { types: Array<Type_MonacoType_Fragment> }
}

export const CreatePrimitiveTypesDocument = gql`
  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
    types: createPrimitiveTypes(input: $input) {
      types: primitiveTypes {
        ...Type
      }
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
export const CreateArrayTypesDocument = gql`
  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
    types: createArrayTypes(input: $input) {
      types: arrayTypes {
        ...Type
      }
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
export const CreateUnionTypesDocument = gql`
  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
    types: createUnionTypes(input: $input) {
      types: unionTypes {
        ...Type
      }
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
export const CreateInterfaceTypesDocument = gql`
  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
    types: createInterfaceTypes(input: $input) {
      types: interfaceTypes {
        ...Type
      }
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
export const CreateElementTypesDocument = gql`
  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
    types: createElementTypes(input: $input) {
      types: elementTypes {
        ...Type
      }
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
export const CreateRenderPropsTypesDocument = gql`
  mutation CreateRenderPropsTypes($input: [RenderPropsTypeCreateInput!]!) {
    types: createRenderPropsTypes(input: $input) {
      types: renderPropsTypes {
        ...Type
      }
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
export const CreateReactNodeTypesDocument = gql`
  mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
    types: createReactNodeTypes(input: $input) {
      types: reactNodeTypes {
        ...Type
      }
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
export const CreateEnumTypesDocument = gql`
  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
    types: createEnumTypes(input: $input) {
      types: enumTypes {
        ...Type
      }
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
export const CreateLambdaTypesDocument = gql`
  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
    types: createLambdaTypes(input: $input) {
      types: lambdaTypes {
        ...Type
      }
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
export const CreatePageTypesDocument = gql`
  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
    types: createPageTypes(input: $input) {
      types: pageTypes {
        ...Type
      }
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
export const CreateAppTypesDocument = gql`
  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
    types: createAppTypes(input: $input) {
      types: appTypes {
        ...Type
      }
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
export const CreateMonacoTypesDocument = gql`
  mutation CreateMonacoTypes($input: [MonacoTypeCreateInput!]!) {
    types: createMonacoTypes(input: $input) {
      types: monacoTypes {
        ...Type
      }
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
    CreateRenderPropsTypes(
      variables: CreateRenderPropsTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateRenderPropsTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateRenderPropsTypesMutation>(
            CreateRenderPropsTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateRenderPropsTypes',
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
    CreateMonacoTypes(
      variables: CreateMonacoTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateMonacoTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateMonacoTypesMutation>(
            CreateMonacoTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMonacoTypes',
        'mutation',
      )
    },
  }
}

export type Sdk = ReturnType<typeof getSdk>
