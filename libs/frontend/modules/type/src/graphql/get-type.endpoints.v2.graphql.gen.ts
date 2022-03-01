import * as Types from '@codelab/shared/abstract/codegen-v2'

import { PrimitiveTypeFragment } from './fragments/PrimitiveType.fragment.v2.graphql.gen'
import {
  ArrayTypeWithItemTypeFragment,
  ArrayTypeFragment,
} from './fragments/ArrayType.fragment.v2.graphql.gen'
import { UnionTypeWithInnerTypesFragment } from './fragments/UnionType.fragment.v2.graphql.gen'
import {
  InterfaceTypeFragment,
  InterfaceTypeWithFieldsFragment,
} from './fragments/Interface.fragment.v2.graphql.gen'
import { EnumTypeFragment } from './fragments/EnumType.fragment.v2.graphql.gen'
import { ElementTypeFragment } from './fragments/ElementType.fragment.v2.graphql.gen'
import { LambdaTypeFragment } from './fragments/LambdaType.fragment.v2.graphql.gen'
import { RenderPropsTypeFragment } from './fragments/RenderProps.fragment.v2.graphql.gen'
import { MonacoTypeFragment } from './fragments/MonacoType.fragment.v2.graphql.gen'
import { PageTypeFragment } from './fragments/PageType.fragment.v2.graphql.gen'
import { AppTypeFragment } from './fragments/AppType.fragment.v2.graphql.gen'
import { InterfaceTypeWithGraphFragment } from './fragments/InterfaceWithGraph.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { PrimitiveTypeFragmentDoc } from './fragments/PrimitiveType.fragment.v2.graphql.gen'
import {
  ArrayTypeWithItemTypeFragmentDoc,
  ArrayTypeFragmentDoc,
} from './fragments/ArrayType.fragment.v2.graphql.gen'
import { UnionTypeWithInnerTypesFragmentDoc } from './fragments/UnionType.fragment.v2.graphql.gen'
import {
  InterfaceTypeFragmentDoc,
  InterfaceTypeWithFieldsFragmentDoc,
} from './fragments/Interface.fragment.v2.graphql.gen'
import { EnumTypeFragmentDoc } from './fragments/EnumType.fragment.v2.graphql.gen'
import { ElementTypeFragmentDoc } from './fragments/ElementType.fragment.v2.graphql.gen'
import { LambdaTypeFragmentDoc } from './fragments/LambdaType.fragment.v2.graphql.gen'
import { RenderPropsTypeFragmentDoc } from './fragments/RenderProps.fragment.v2.graphql.gen'
import { MonacoTypeFragmentDoc } from './fragments/MonacoType.fragment.v2.graphql.gen'
import { PageTypeFragmentDoc } from './fragments/PageType.fragment.v2.graphql.gen'
import { AppTypeFragmentDoc } from './fragments/AppType.fragment.v2.graphql.gen'
import { InterfaceTypeWithGraphFragmentDoc } from './fragments/InterfaceWithGraph.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type GetPrimitiveTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PrimitiveTypeOptions>
  where?: Types.InputMaybe<Types.PrimitiveTypeWhere>
}>

export type GetPrimitiveTypesQuery = { types: Array<PrimitiveTypeFragment> }

export type GetArrayTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ArrayTypeOptions>
  where?: Types.InputMaybe<Types.ArrayTypeWhere>
}>

export type GetArrayTypesQuery = { types: Array<ArrayTypeWithItemTypeFragment> }

export type GetUnionTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.UnionTypeOptions>
  where?: Types.InputMaybe<Types.UnionTypeWhere>
}>

export type GetUnionTypesQuery = { types: Array<UnionTypeFragment> }

export type GetInterfaceTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.InterfaceTypeOptions>
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>
}>

export type GetInterfaceTypesQuery = { types: Array<InterfaceTypeFragment> }

export type GetInterfaceTypesWithFieldsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.InterfaceTypeOptions>
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>
}>

export type GetInterfaceTypesWithFieldsQuery = {
  types: Array<InterfaceTypeWithFieldsFragment>
}

export type GetInterfaceTypeGraphsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.InterfaceTypeOptions>
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>
}>

export type GetInterfaceTypeGraphsQuery = {
  types: Array<InterfaceTypeWithGraphFragment>
}

export type GetElementTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementTypeOptions>
  where?: Types.InputMaybe<Types.ElementTypeWhere>
}>

export type GetElementTypesQuery = { types: Array<ElementTypeFragment> }

export type GetRenderPropsTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.RenderPropsTypeOptions>
  where?: Types.InputMaybe<Types.RenderPropsTypeWhere>
}>

export type GetRenderPropsTypesQuery = { types: Array<RenderPropsTypeFragment> }

export type GetEnumTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.EnumTypeOptions>
  where?: Types.InputMaybe<Types.EnumTypeWhere>
}>

export type GetEnumTypesQuery = { types: Array<EnumTypeFragment> }

export type GetLambdaTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.LambdaTypeOptions>
  where?: Types.InputMaybe<Types.LambdaTypeWhere>
}>

export type GetLambdaTypesQuery = { types: Array<LambdaTypeFragment> }

export type GetPageTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PageTypeOptions>
  where?: Types.InputMaybe<Types.PageTypeWhere>
}>

export type GetPageTypesQuery = { types: Array<PageTypeFragment> }

export type GetAppTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppTypeOptions>
  where?: Types.InputMaybe<Types.AppTypeWhere>
}>

export type GetAppTypesQuery = { types: Array<AppTypeFragment> }

export type GetMonacoTypesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.MonacoTypeOptions>
  where?: Types.InputMaybe<Types.MonacoTypeWhere>
}>

export type GetMonacoTypesQuery = { types: Array<MonacoTypeFragment> }

export const GetPrimitiveTypesGql = gql`
  query GetPrimitiveTypes(
    $options: PrimitiveTypeOptions
    $where: PrimitiveTypeWhere
  ) {
    types: primitiveTypes(where: $where, options: $options) {
      ...PrimitiveType
    }
  }
  ${PrimitiveTypeFragmentDoc}
`
export const GetArrayTypesGql = gql`
  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
    types: arrayTypes(where: $where, options: $options) {
      ...ArrayTypeWithItemType
    }
  }
  ${ArrayTypeWithItemTypeFragmentDoc}
`
export const GetUnionTypesGql = gql`
  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
    types: unionTypes(where: $where, options: $options) {
      ...UnionTypeWithInnerTypes
    }
  }
  ${UnionTypeWithInnerTypesFragmentDoc}
`
export const GetInterfaceTypesGql = gql`
  query GetInterfaceTypes(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(where: $where, options: $options) {
      ...InterfaceType
    }
  }
  ${InterfaceTypeFragmentDoc}
`
export const GetInterfaceTypesWithFieldsGql = gql`
  query GetInterfaceTypesWithFields(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(where: $where, options: $options) {
      ...InterfaceTypeWithFields
    }
  }
  ${InterfaceTypeWithFieldsFragmentDoc}
`
export const GetInterfaceTypeGraphsGql = gql`
  query GetInterfaceTypeGraphs(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(where: $where, options: $options) {
      ...InterfaceTypeWithGraph
    }
  }
  ${InterfaceTypeWithGraphFragmentDoc}
`
export const GetElementTypesGql = gql`
  query GetElementTypes(
    $options: ElementTypeOptions
    $where: ElementTypeWhere
  ) {
    types: elementTypes(where: $where, options: $options) {
      ...ElementType
    }
  }
  ${ElementTypeFragmentDoc}
`
export const GetRenderPropsTypesGql = gql`
  query GetRenderPropsTypes(
    $options: RenderPropsTypeOptions
    $where: RenderPropsTypeWhere
  ) {
    types: renderPropsTypes(where: $where, options: $options) {
      ...RenderPropsType
    }
  }
  ${RenderPropsTypeFragmentDoc}
`
export const GetEnumTypesGql = gql`
  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
    types: enumTypes(where: $where, options: $options) {
      ...EnumType
    }
  }
  ${EnumTypeFragmentDoc}
`
export const GetLambdaTypesGql = gql`
  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
    types: lambdaTypes(where: $where, options: $options) {
      ...LambdaType
    }
  }
  ${LambdaTypeFragmentDoc}
`
export const GetPageTypesGql = gql`
  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
    types: pageTypes(where: $where, options: $options) {
      ...PageType
    }
  }
  ${PageTypeFragmentDoc}
`
export const GetAppTypesGql = gql`
  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
    types: appTypes(where: $where, options: $options) {
      ...AppType
    }
  }
  ${AppTypeFragmentDoc}
`
export const GetMonacoTypesGql = gql`
  query GetMonacoTypes($options: MonacoTypeOptions, $where: MonacoTypeWhere) {
    types: monacoTypes(where: $where, options: $options) {
      ...MonacoType
    }
  }
  ${MonacoTypeFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetPrimitiveTypes: build.query<
      GetPrimitiveTypesQuery,
      | GraphqlOperationOptions<GetPrimitiveTypesQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetPrimitiveTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetArrayTypes: build.query<
      GetArrayTypesQuery,
      GraphqlOperationOptions<GetArrayTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetArrayTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetUnionTypes: build.query<
      GetUnionTypesQuery,
      GraphqlOperationOptions<GetUnionTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetUnionTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetInterfaceTypes: build.query<
      GetInterfaceTypesQuery,
      | GraphqlOperationOptions<GetInterfaceTypesQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetInterfaceTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetInterfaceTypesWithFields: build.query<
      GetInterfaceTypesWithFieldsQuery,
      | GraphqlOperationOptions<GetInterfaceTypesWithFieldsQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetInterfaceTypesWithFieldsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetInterfaceTypeGraphs: build.query<
      GetInterfaceTypeGraphsQuery,
      | GraphqlOperationOptions<GetInterfaceTypeGraphsQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetInterfaceTypeGraphsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetElementTypes: build.query<
      GetElementTypesQuery,
      GraphqlOperationOptions<GetElementTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetElementTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetRenderPropsTypes: build.query<
      GetRenderPropsTypesQuery,
      | GraphqlOperationOptions<GetRenderPropsTypesQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetRenderPropsTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetEnumTypes: build.query<
      GetEnumTypesQuery,
      GraphqlOperationOptions<GetEnumTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetEnumTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetLambdaTypes: build.query<
      GetLambdaTypesQuery,
      GraphqlOperationOptions<GetLambdaTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetLambdaTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetPageTypes: build.query<
      GetPageTypesQuery,
      GraphqlOperationOptions<GetPageTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetPageTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetAppTypes: build.query<
      GetAppTypesQuery,
      GraphqlOperationOptions<GetAppTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetAppTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetMonacoTypes: build.query<
      GetMonacoTypesQuery,
      GraphqlOperationOptions<GetMonacoTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetMonacoTypesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useGetPrimitiveTypesQuery,
  useLazyGetPrimitiveTypesQuery,
  useGetArrayTypesQuery,
  useLazyGetArrayTypesQuery,
  useGetUnionTypesQuery,
  useLazyGetUnionTypesQuery,
  useGetInterfaceTypesQuery,
  useLazyGetInterfaceTypesQuery,
  useGetInterfaceTypesWithFieldsQuery,
  useLazyGetInterfaceTypesWithFieldsQuery,
  useGetInterfaceTypeGraphsQuery,
  useLazyGetInterfaceTypeGraphsQuery,
  useGetElementTypesQuery,
  useLazyGetElementTypesQuery,
  useGetRenderPropsTypesQuery,
  useLazyGetRenderPropsTypesQuery,
  useGetEnumTypesQuery,
  useLazyGetEnumTypesQuery,
  useGetLambdaTypesQuery,
  useLazyGetLambdaTypesQuery,
  useGetPageTypesQuery,
  useLazyGetPageTypesQuery,
  useGetAppTypesQuery,
  useLazyGetAppTypesQuery,
  useGetMonacoTypesQuery,
  useLazyGetMonacoTypesQuery,
} = injectedRtkApi
