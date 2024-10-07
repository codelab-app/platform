import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'

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
} from './update-type.api.documents.graphql.gen'

export const UpdatePrimitiveTypes = (
  variables: UpdatePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdatePrimitiveTypesDocument.toString(), variables, next)

export const UpdateArrayTypes = (
  variables: UpdateArrayTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateArrayTypesDocument.toString(), variables, next)

export const UpdateUnionTypes = (
  variables: UpdateUnionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateUnionTypesDocument.toString(), variables, next)

export const UpdateInterfaceTypes = (
  variables: UpdateInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateInterfaceTypesDocument.toString(), variables, next)

export const UpdateReactNodeTypes = (
  variables: UpdateReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateReactNodeTypesDocument.toString(), variables, next)

export const UpdateElementTypes = (
  variables: UpdateElementTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateElementTypesDocument.toString(), variables, next)

export const UpdateRenderPropTypes = (
  variables: UpdateRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateRenderPropTypesDocument.toString(), variables, next)

export const UpdateEnumTypes = (
  variables: UpdateEnumTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateEnumTypesDocument.toString(), variables, next)

export const UpdateLambdaTypes = (
  variables: UpdateLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateLambdaTypesDocument.toString(), variables, next)

export const UpdatePageTypes = (
  variables: UpdatePageTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdatePageTypesDocument.toString(), variables, next)

export const UpdateAppTypes = (
  variables: UpdateAppTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateAppTypesDocument.toString(), variables, next)

export const UpdateRichTextTypes = (
  variables: UpdateRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateRichTextTypesDocument.toString(), variables, next)

export const UpdateActionTypes = (
  variables: UpdateActionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateActionTypesDocument.toString(), variables, next)

export const UpdateCodeMirrorTypes = (
  variables: UpdateCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateCodeMirrorTypesDocument.toString(), variables, next)
