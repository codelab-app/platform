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

export const CreatePrimitiveTypesGql = gql`
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
export const CreateArrayTypesGql = gql`
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
export const CreateUnionTypesGql = gql`
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
export const CreateInterfaceTypesGql = gql`
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
export const CreateElementTypesGql = gql`
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
export const CreateRenderPropsTypesGql = gql`
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
export const CreateReactNodeTypesGql = gql`
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
export const CreateEnumTypesGql = gql`
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
export const CreateLambdaTypesGql = gql`
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
export const CreatePageTypesGql = gql`
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
export const CreateAppTypesGql = gql`
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
export const CreateMonacoTypesGql = gql`
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
            CreatePrimitiveTypesGql,
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
            CreateArrayTypesGql,
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
            CreateUnionTypesGql,
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
            CreateInterfaceTypesGql,
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
            CreateElementTypesGql,
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
            CreateRenderPropsTypesGql,
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
            CreateReactNodeTypesGql,
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
            CreateEnumTypesGql,
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
            CreateLambdaTypesGql,
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
            CreatePageTypesGql,
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
          client.request<CreateAppTypesMutation>(CreateAppTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
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
            CreateMonacoTypesGql,
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
