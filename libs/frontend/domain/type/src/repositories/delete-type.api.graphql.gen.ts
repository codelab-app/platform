import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'

import {
  type DeletePrimitiveTypesMutationVariables,
  type DeleteArrayTypesMutationVariables,
  type DeleteReactNodeTypesMutationVariables,
  type DeleteUnionTypesMutationVariables,
  type DeleteInterfaceTypesMutationVariables,
  type DeleteElementTypesMutationVariables,
  type DeleteRenderPropTypesMutationVariables,
  type DeleteRichTextTypesMutationVariables,
  type DeleteEnumTypesMutationVariables,
  type DeleteLambdaTypesMutationVariables,
  type DeletePageTypesMutationVariables,
  type DeleteAppTypesMutationVariables,
  type DeleteActionTypesMutationVariables,
  type DeleteCodeMirrorTypesMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  DeletePrimitiveTypesDocument,
  DeleteArrayTypesDocument,
  DeleteReactNodeTypesDocument,
  DeleteUnionTypesDocument,
  DeleteInterfaceTypesDocument,
  DeleteElementTypesDocument,
  DeleteRenderPropTypesDocument,
  DeleteRichTextTypesDocument,
  DeleteEnumTypesDocument,
  DeleteLambdaTypesDocument,
  DeletePageTypesDocument,
  DeleteAppTypesDocument,
  DeleteActionTypesDocument,
  DeleteCodeMirrorTypesDocument,
} from './delete-type.api.documents.graphql.gen'

export const DeletePrimitiveTypes = (
  variables: DeletePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeletePrimitiveTypesDocument.toString(), variables, next)

export const DeleteArrayTypes = (
  variables: DeleteArrayTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteArrayTypesDocument.toString(), variables, next)

export const DeleteReactNodeTypes = (
  variables: DeleteReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteReactNodeTypesDocument.toString(), variables, next)

export const DeleteUnionTypes = (
  variables: DeleteUnionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteUnionTypesDocument.toString(), variables, next)

export const DeleteInterfaceTypes = (
  variables: DeleteInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteInterfaceTypesDocument.toString(), variables, next)

export const DeleteElementTypes = (
  variables: DeleteElementTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteElementTypesDocument.toString(), variables, next)

export const DeleteRenderPropTypes = (
  variables: DeleteRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteRenderPropTypesDocument.toString(), variables, next)

export const DeleteRichTextTypes = (
  variables: DeleteRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteRichTextTypesDocument.toString(), variables, next)

export const DeleteEnumTypes = (
  variables: DeleteEnumTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteEnumTypesDocument.toString(), variables, next)

export const DeleteLambdaTypes = (
  variables: DeleteLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteLambdaTypesDocument.toString(), variables, next)

export const DeletePageTypes = (
  variables: DeletePageTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeletePageTypesDocument.toString(), variables, next)

export const DeleteAppTypes = (
  variables: DeleteAppTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteAppTypesDocument.toString(), variables, next)

export const DeleteActionTypes = (
  variables: DeleteActionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteActionTypesDocument.toString(), variables, next)

export const DeleteCodeMirrorTypes = (
  variables: DeleteCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteCodeMirrorTypesDocument.toString(), variables, next)
