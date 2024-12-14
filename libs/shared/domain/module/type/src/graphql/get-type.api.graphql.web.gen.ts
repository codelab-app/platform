import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
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
} from './get-type.api.graphql.docs.gen'

export const GetBaseTypes = (
  variables: GetBaseTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetBaseTypesDocument.toString(), variables, next)

export const GetTypes = (
  variables: GetTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetTypesDocument.toString(), variables, next)

export const GetDescendants = (
  variables: GetDescendantsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetDescendantsDocument.toString(), variables, next)

export const GetPrimitiveTypes = (
  variables: GetPrimitiveTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetPrimitiveTypesDocument.toString(), variables, next)

export const GetArrayTypes = (
  variables: GetArrayTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetArrayTypesDocument.toString(), variables, next)

export const GetUnionTypes = (
  variables: GetUnionTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetUnionTypesDocument.toString(), variables, next)

export const GetInterfaceTypes = (
  variables: GetInterfaceTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetInterfaceTypesDocument.toString(), variables, next)

export const GetElementTypes = (
  variables: GetElementTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetElementTypesDocument.toString(), variables, next)

export const GetRenderPropTypes = (
  variables: GetRenderPropTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetRenderPropTypesDocument.toString(), variables, next)

export const GetReactNodeTypes = (
  variables: GetReactNodeTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetReactNodeTypesDocument.toString(), variables, next)

export const GetRichTextTypes = (
  variables: GetRichTextTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetRichTextTypesDocument.toString(), variables, next)

export const GetEnumTypes = (
  variables: GetEnumTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetEnumTypesDocument.toString(), variables, next)

export const GetLambdaTypes = (
  variables: GetLambdaTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetLambdaTypesDocument.toString(), variables, next)

export const GetPageTypes = (
  variables: GetPageTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetPageTypesDocument.toString(), variables, next)

export const GetAppTypes = (
  variables: GetAppTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetAppTypesDocument.toString(), variables, next)

export const GetActionTypes = (
  variables: GetActionTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetActionTypesDocument.toString(), variables, next)

export const GetCodeMirrorTypes = (
  variables: GetCodeMirrorTypesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetCodeMirrorTypesDocument.toString(), variables, next)
