import * as Types from '@codelab/shared/abstract/codegen-v2'

import { PrimitiveTypeFragment } from './fragments/PrimitiveType.fragment.v2.graphql.gen'
import { ArrayTypeFragment } from './fragments/ArrayType.fragment.v2.graphql.gen'
import {
  UnionTypeFragment,
  UnionTypeWithInnerTypesFragment,
} from './fragments/UnionType.fragment.v2.graphql.gen'
import {
  InterfaceTypeFragment,
  InterfaceTypeWithFieldsFragment,
} from './fragments/Interface.fragment.v2.graphql.gen'
import { ElementTypeFragment } from './fragments/ElementType.fragment.v2.graphql.gen'
import { RenderPropsTypeFragment } from './fragments/RenderProps.fragment.v2.graphql.gen'
import { EnumTypeFragment } from './fragments/EnumType.fragment.v2.graphql.gen'
import { LambdaTypeFragment } from './fragments/LambdaType.fragment.v2.graphql.gen'
import { PageTypeFragment } from './fragments/PageType.fragment.v2.graphql.gen'
import { AppTypeFragment } from './fragments/AppType.fragment.v2.graphql.gen'
import { MonacoTypeFragment } from './fragments/MonacoType.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { PrimitiveTypeFragmentDoc } from './fragments/PrimitiveType.fragment.v2.graphql.gen'
import { ArrayTypeFragmentDoc } from './fragments/ArrayType.fragment.v2.graphql.gen'
import {
  UnionTypeFragmentDoc,
  UnionTypeWithInnerTypesFragmentDoc,
} from './fragments/UnionType.fragment.v2.graphql.gen'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeWithFieldsFragmentDoc,
} from './fragments/Interface.fragment.v2.graphql.gen'
import { ElementTypeFragmentDoc } from './fragments/ElementType.fragment.v2.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './fragments/RenderProps.fragment.v2.graphql.gen'
import { EnumTypeFragmentDoc } from './fragments/EnumType.fragment.v2.graphql.gen'
import { LambdaTypeFragmentDoc } from './fragments/LambdaType.fragment.v2.graphql.gen'
import { PageTypeFragmentDoc } from './fragments/PageType.fragment.v2.graphql.gen'
import { AppTypeFragmentDoc } from './fragments/AppType.fragment.v2.graphql.gen'
import { MonacoTypeFragmentDoc } from './fragments/MonacoType.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreatePrimitiveTypesMutationVariables = Types.Exact<{
  input: Array<Types.PrimitiveTypeCreateInput> | Types.PrimitiveTypeCreateInput
}>

export type CreatePrimitiveTypesMutation = {
  createPrimitiveTypes: {
    primitiveTypes: Array<{
      ' $fragmentRefs': { PrimitiveTypeFragment: PrimitiveTypeFragment }
    }>
  }
}

export type CreateArrayTypesMutationVariables = Types.Exact<{
  input: Array<Types.ArrayTypeCreateInput> | Types.ArrayTypeCreateInput
}>

export type CreateArrayTypesMutation = {
  createArrayTypes: {
    arrayTypes: Array<{
      ' $fragmentRefs': { ArrayTypeFragment: ArrayTypeFragment }
    }>
  }
}

export type CreateUnionTypesMutationVariables = Types.Exact<{
  input: Array<Types.UnionTypeCreateInput> | Types.UnionTypeCreateInput
}>

export type CreateUnionTypesMutation = {
  createUnionTypes: {
    unionTypes: Array<{
      ' $fragmentRefs': { UnionTypeFragment: UnionTypeFragment }
    }>
  }
}

export type CreateInterfaceTypesMutationVariables = Types.Exact<{
  input: Array<Types.InterfaceTypeCreateInput> | Types.InterfaceTypeCreateInput
}>

export type CreateInterfaceTypesMutation = {
  createInterfaceTypes: {
    interfaceTypes: Array<{
      ' $fragmentRefs': { InterfaceTypeFragment: InterfaceTypeFragment }
    }>
  }
}

export type CreateElementTypesMutationVariables = Types.Exact<{
  input: Array<Types.ElementTypeCreateInput> | Types.ElementTypeCreateInput
}>

export type CreateElementTypesMutation = {
  createElementTypes: {
    elementTypes: Array<{
      ' $fragmentRefs': { ElementTypeFragment: ElementTypeFragment }
    }>
  }
}

export type CreateRenderPropsTypesMutationVariables = Types.Exact<{
  input:
    | Array<Types.RenderPropsTypeCreateInput>
    | Types.RenderPropsTypeCreateInput
}>

export type CreateRenderPropsTypesMutation = {
  createRenderPropsTypes: {
    renderPropsTypes: Array<{
      ' $fragmentRefs': { RenderPropsTypeFragment: RenderPropsTypeFragment }
    }>
  }
}

export type CreateEnumTypesMutationVariables = Types.Exact<{
  input: Array<Types.EnumTypeCreateInput> | Types.EnumTypeCreateInput
}>

export type CreateEnumTypesMutation = {
  createEnumTypes: {
    enumTypes: Array<{
      ' $fragmentRefs': { EnumTypeFragment: EnumTypeFragment }
    }>
  }
}

export type CreateLambdaTypesMutationVariables = Types.Exact<{
  input: Array<Types.LambdaTypeCreateInput> | Types.LambdaTypeCreateInput
}>

export type CreateLambdaTypesMutation = {
  createLambdaTypes: {
    lambdaTypes: Array<{
      ' $fragmentRefs': { LambdaTypeFragment: LambdaTypeFragment }
    }>
  }
}

export type CreatePageTypesMutationVariables = Types.Exact<{
  input: Array<Types.PageTypeCreateInput> | Types.PageTypeCreateInput
}>

export type CreatePageTypesMutation = {
  createPageTypes: {
    pageTypes: Array<{
      ' $fragmentRefs': { PageTypeFragment: PageTypeFragment }
    }>
  }
}

export type CreateAppTypesMutationVariables = Types.Exact<{
  input: Array<Types.AppTypeCreateInput> | Types.AppTypeCreateInput
}>

export type CreateAppTypesMutation = {
  createAppTypes: {
    appTypes: Array<{ ' $fragmentRefs': { AppTypeFragment: AppTypeFragment } }>
  }
}

export type CreateMonacoTypesMutationVariables = Types.Exact<{
  input: Array<Types.MonacoTypeCreateInput> | Types.MonacoTypeCreateInput
}>

export type CreateMonacoTypesMutation = {
  createMonacoTypes: {
    monacoTypes: Array<{
      ' $fragmentRefs': { MonacoTypeFragment: MonacoTypeFragment }
    }>
  }
}

export const CreatePrimitiveTypesGql = gql`
  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
    createPrimitiveTypes(input: $input) {
      primitiveTypes {
        ...PrimitiveType
      }
    }
  }
  ${PrimitiveTypeFragmentDoc}
`
export const CreateArrayTypesGql = gql`
  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
    createArrayTypes(input: $input) {
      arrayTypes {
        ...ArrayType
      }
    }
  }
  ${ArrayTypeFragmentDoc}
`
export const CreateUnionTypesGql = gql`
  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
    createUnionTypes(input: $input) {
      unionTypes {
        ...UnionType
      }
    }
  }
  ${UnionTypeFragmentDoc}
`
export const CreateInterfaceTypesGql = gql`
  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
    createInterfaceTypes(input: $input) {
      interfaceTypes {
        ...InterfaceType
      }
    }
  }
  ${InterfaceTypeFragmentDoc}
`
export const CreateElementTypesGql = gql`
  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
    createElementTypes(input: $input) {
      elementTypes {
        ...ElementType
      }
    }
  }
  ${ElementTypeFragmentDoc}
`
export const CreateRenderPropsTypesGql = gql`
  mutation CreateRenderPropsTypes($input: [RenderPropsTypeCreateInput!]!) {
    createRenderPropsTypes(input: $input) {
      renderPropsTypes {
        ...RenderPropsType
      }
    }
  }
  ${RenderPropsTypeFragmentDoc}
`
export const CreateEnumTypesGql = gql`
  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
    createEnumTypes(input: $input) {
      enumTypes {
        ...EnumType
      }
    }
  }
  ${EnumTypeFragmentDoc}
`
export const CreateLambdaTypesGql = gql`
  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
    createLambdaTypes(input: $input) {
      lambdaTypes {
        ...LambdaType
      }
    }
  }
  ${LambdaTypeFragmentDoc}
`
export const CreatePageTypesGql = gql`
  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
    createPageTypes(input: $input) {
      pageTypes {
        ...PageType
      }
    }
  }
  ${PageTypeFragmentDoc}
`
export const CreateAppTypesGql = gql`
  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
    createAppTypes(input: $input) {
      appTypes {
        ...AppType
      }
    }
  }
  ${AppTypeFragmentDoc}
`
export const CreateMonacoTypesGql = gql`
  mutation CreateMonacoTypes($input: [MonacoTypeCreateInput!]!) {
    createMonacoTypes(input: $input) {
      monacoTypes {
        ...MonacoType
      }
    }
  }
  ${MonacoTypeFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreatePrimitiveTypes: build.mutation<
      CreatePrimitiveTypesMutation,
      GraphqlOperationOptions<CreatePrimitiveTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreatePrimitiveTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateArrayTypes: build.mutation<
      CreateArrayTypesMutation,
      GraphqlOperationOptions<CreateArrayTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateArrayTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateUnionTypes: build.mutation<
      CreateUnionTypesMutation,
      GraphqlOperationOptions<CreateUnionTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateUnionTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateInterfaceTypes: build.mutation<
      CreateInterfaceTypesMutation,
      GraphqlOperationOptions<CreateInterfaceTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateInterfaceTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateElementTypes: build.mutation<
      CreateElementTypesMutation,
      GraphqlOperationOptions<CreateElementTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateElementTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateRenderPropsTypes: build.mutation<
      CreateRenderPropsTypesMutation,
      GraphqlOperationOptions<CreateRenderPropsTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateRenderPropsTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateEnumTypes: build.mutation<
      CreateEnumTypesMutation,
      GraphqlOperationOptions<CreateEnumTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateEnumTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateLambdaTypes: build.mutation<
      CreateLambdaTypesMutation,
      GraphqlOperationOptions<CreateLambdaTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateLambdaTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreatePageTypes: build.mutation<
      CreatePageTypesMutation,
      GraphqlOperationOptions<CreatePageTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreatePageTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateAppTypes: build.mutation<
      CreateAppTypesMutation,
      GraphqlOperationOptions<CreateAppTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateAppTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    CreateMonacoTypes: build.mutation<
      CreateMonacoTypesMutation,
      GraphqlOperationOptions<CreateMonacoTypesMutationVariables>
    >({
      query: (options) => ({
        document: CreateMonacoTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreatePrimitiveTypesMutation,
  useCreateArrayTypesMutation,
  useCreateUnionTypesMutation,
  useCreateInterfaceTypesMutation,
  useCreateElementTypesMutation,
  useCreateRenderPropsTypesMutation,
  useCreateEnumTypesMutation,
  useCreateLambdaTypesMutation,
  useCreatePageTypesMutation,
  useCreateAppTypesMutation,
  useCreateMonacoTypesMutation,
} = injectedRtkApi
