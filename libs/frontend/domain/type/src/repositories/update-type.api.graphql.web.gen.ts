import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'

import {
  type UpdatePrimitiveTypesMutationVariables,
  type UpdateArrayTypesMutationVariables,
  type UpdateUnionTypesMutationVariables,
  type UpdateInterfaceTypesMutationVariables,
  type UpdateReactNodeTypesMutationVariables,
  type UpdateElementTypesMutationVariables,
  type UpdateRenderPropTypesMutationVariables,
  type UpdateEnumTypesMutationVariables,
  type UpdateLambdaTypesMutationVariables,
  type UpdatePageTypesMutationVariables,
  type UpdateAppTypesMutationVariables,
  type UpdateRichTextTypesMutationVariables,
  type UpdateActionTypesMutationVariables,
  type UpdateCodeMirrorTypesMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  UpdatePrimitiveTypesDocument,
  UpdateArrayTypesDocument,
  UpdateUnionTypesDocument,
  UpdateInterfaceTypesDocument,
  UpdateReactNodeTypesDocument,
  UpdateElementTypesDocument,
  UpdateRenderPropTypesDocument,
  UpdateEnumTypesDocument,
  UpdateLambdaTypesDocument,
  UpdatePageTypesDocument,
  UpdateAppTypesDocument,
  UpdateRichTextTypesDocument,
  UpdateActionTypesDocument,
  UpdateCodeMirrorTypesDocument,
} from './update-type.api.graphql.docs.gen'

export const UpdatePrimitiveTypes = (
  variables: UpdatePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdatePrimitiveTypesDocument.toString(), variables, next)

export const UpdateArrayTypes = (
  variables: UpdateArrayTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateArrayTypesDocument.toString(), variables, next)

export const UpdateUnionTypes = (
  variables: UpdateUnionTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateUnionTypesDocument.toString(), variables, next)

export const UpdateInterfaceTypes = (
  variables: UpdateInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateInterfaceTypesDocument.toString(), variables, next)

export const UpdateReactNodeTypes = (
  variables: UpdateReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateReactNodeTypesDocument.toString(), variables, next)

export const UpdateElementTypes = (
  variables: UpdateElementTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateElementTypesDocument.toString(), variables, next)

export const UpdateRenderPropTypes = (
  variables: UpdateRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateRenderPropTypesDocument.toString(), variables, next)

export const UpdateEnumTypes = (
  variables: UpdateEnumTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateEnumTypesDocument.toString(), variables, next)

export const UpdateLambdaTypes = (
  variables: UpdateLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateLambdaTypesDocument.toString(), variables, next)

export const UpdatePageTypes = (
  variables: UpdatePageTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdatePageTypesDocument.toString(), variables, next)

export const UpdateAppTypes = (
  variables: UpdateAppTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateAppTypesDocument.toString(), variables, next)

export const UpdateRichTextTypes = (
  variables: UpdateRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateRichTextTypesDocument.toString(), variables, next)

export const UpdateActionTypes = (
  variables: UpdateActionTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateActionTypesDocument.toString(), variables, next)

export const UpdateCodeMirrorTypes = (
  variables: UpdateCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateCodeMirrorTypesDocument.toString(), variables, next)
