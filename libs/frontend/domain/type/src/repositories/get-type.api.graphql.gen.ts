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
} from './get-type.api.documents.graphql.gen'

export const GetBaseTypes = (
  variables: GetBaseTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetBaseTypesDocument.toString(), variables, next)

export const GetTypes = (
  variables: GetTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetTypesDocument.toString(), variables, next)

export const GetDescendants = (
  variables: GetDescendantsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetDescendantsDocument.toString(), variables, next)

export const GetPrimitiveTypes = (
  variables: GetPrimitiveTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetPrimitiveTypesDocument.toString(), variables, next)

export const GetArrayTypes = (
  variables: GetArrayTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetArrayTypesDocument.toString(), variables, next)

export const GetUnionTypes = (
  variables: GetUnionTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetUnionTypesDocument.toString(), variables, next)

export const GetInterfaceTypes = (
  variables: GetInterfaceTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetInterfaceTypesDocument.toString(), variables, next)

export const GetElementTypes = (
  variables: GetElementTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetElementTypesDocument.toString(), variables, next)

export const GetRenderPropTypes = (
  variables: GetRenderPropTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetRenderPropTypesDocument.toString(), variables, next)

export const GetReactNodeTypes = (
  variables: GetReactNodeTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetReactNodeTypesDocument.toString(), variables, next)

export const GetRichTextTypes = (
  variables: GetRichTextTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetRichTextTypesDocument.toString(), variables, next)

export const GetEnumTypes = (
  variables: GetEnumTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetEnumTypesDocument.toString(), variables, next)

export const GetLambdaTypes = (
  variables: GetLambdaTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetLambdaTypesDocument.toString(), variables, next)

export const GetPageTypes = (
  variables: GetPageTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetPageTypesDocument.toString(), variables, next)

export const GetAppTypes = (
  variables: GetAppTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetAppTypesDocument.toString(), variables, next)

export const GetActionTypes = (
  variables: GetActionTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetActionTypesDocument.toString(), variables, next)

export const GetCodeMirrorTypes = (
  variables: GetCodeMirrorTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetCodeMirrorTypesDocument.toString(), variables, next)
