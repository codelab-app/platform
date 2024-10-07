import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import {
  BaseTypeFragmentDoc,
  TypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RichTextTypeFragmentDoc,
} from '@codelab/shared/infra/gql'

import {
  type GetBaseTypesQueryVariables,
  type GetTypesQueryVariables,
  type GetDescendantsQueryVariables,
  type GetPrimitiveTypesQueryVariables,
  type GetArrayTypesQueryVariables,
  type GetUnionTypesQueryVariables,
  type GetInterfaceTypesQueryVariables,
  type GetElementTypesQueryVariables,
  type GetRenderPropTypesQueryVariables,
  type GetReactNodeTypesQueryVariables,
  type GetRichTextTypesQueryVariables,
  type GetEnumTypesQueryVariables,
  type GetLambdaTypesQueryVariables,
  type GetPageTypesQueryVariables,
  type GetAppTypesQueryVariables,
  type GetActionTypesQueryVariables,
  type GetCodeMirrorTypesQueryVariables,
  type GetTypeOptionsQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  GetBaseTypesDocument,
  GetTypesDocument,
  GetDescendantsDocument,
  GetPrimitiveTypesDocument,
  GetArrayTypesDocument,
  GetUnionTypesDocument,
  GetInterfaceTypesDocument,
  GetElementTypesDocument,
  GetRenderPropTypesDocument,
  GetReactNodeTypesDocument,
  GetRichTextTypesDocument,
  GetEnumTypesDocument,
  GetLambdaTypesDocument,
  GetPageTypesDocument,
  GetAppTypesDocument,
  GetActionTypesDocument,
  GetCodeMirrorTypesDocument,
  GetTypeOptionsDocument,
} from './get-type.api.documents.graphql.gen'

export const GetBaseTypes = (
  variables: GetBaseTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetBaseTypesDocument.toString(), variables, next)

export const GetTypes = (
  variables: GetTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTypesDocument.toString(), variables, next)

export const GetDescendants = (
  variables: GetDescendantsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetDescendantsDocument.toString(), variables, next)

export const GetPrimitiveTypes = (
  variables: GetPrimitiveTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetPrimitiveTypesDocument.toString(), variables, next)

export const GetArrayTypes = (
  variables: GetArrayTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetArrayTypesDocument.toString(), variables, next)

export const GetUnionTypes = (
  variables: GetUnionTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetUnionTypesDocument.toString(), variables, next)

export const GetInterfaceTypes = (
  variables: GetInterfaceTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetInterfaceTypesDocument.toString(), variables, next)

export const GetElementTypes = (
  variables: GetElementTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetElementTypesDocument.toString(), variables, next)

export const GetRenderPropTypes = (
  variables: GetRenderPropTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetRenderPropTypesDocument.toString(), variables, next)

export const GetReactNodeTypes = (
  variables: GetReactNodeTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetReactNodeTypesDocument.toString(), variables, next)

export const GetRichTextTypes = (
  variables: GetRichTextTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetRichTextTypesDocument.toString(), variables, next)

export const GetEnumTypes = (
  variables: GetEnumTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetEnumTypesDocument.toString(), variables, next)

export const GetLambdaTypes = (
  variables: GetLambdaTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetLambdaTypesDocument.toString(), variables, next)

export const GetPageTypes = (
  variables: GetPageTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetPageTypesDocument.toString(), variables, next)

export const GetAppTypes = (
  variables: GetAppTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAppTypesDocument.toString(), variables, next)

export const GetActionTypes = (
  variables: GetActionTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetActionTypesDocument.toString(), variables, next)

export const GetCodeMirrorTypes = (
  variables: GetCodeMirrorTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetCodeMirrorTypesDocument.toString(), variables, next)

export const GetTypeOptions = (
  variables: GetTypeOptionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTypeOptionsDocument.toString(), variables, next)
