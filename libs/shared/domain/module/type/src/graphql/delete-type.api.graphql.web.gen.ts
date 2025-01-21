import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'

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
} from '@codelab/shared/infra/gqlgen'
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
} from './delete-type.api.graphql.docs.gen'

export const DeletePrimitiveTypes = (
  variables: DeletePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeletePrimitiveTypesDocument.toString(), variables, next)

export const DeleteArrayTypes = (
  variables: DeleteArrayTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteArrayTypesDocument.toString(), variables, next)

export const DeleteReactNodeTypes = (
  variables: DeleteReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteReactNodeTypesDocument.toString(), variables, next)

export const DeleteUnionTypes = (
  variables: DeleteUnionTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteUnionTypesDocument.toString(), variables, next)

export const DeleteInterfaceTypes = (
  variables: DeleteInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteInterfaceTypesDocument.toString(), variables, next)

export const DeleteElementTypes = (
  variables: DeleteElementTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteElementTypesDocument.toString(), variables, next)

export const DeleteRenderPropTypes = (
  variables: DeleteRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteRenderPropTypesDocument.toString(), variables, next)

export const DeleteRichTextTypes = (
  variables: DeleteRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteRichTextTypesDocument.toString(), variables, next)

export const DeleteEnumTypes = (
  variables: DeleteEnumTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteEnumTypesDocument.toString(), variables, next)

export const DeleteLambdaTypes = (
  variables: DeleteLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteLambdaTypesDocument.toString(), variables, next)

export const DeletePageTypes = (
  variables: DeletePageTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeletePageTypesDocument.toString(), variables, next)

export const DeleteAppTypes = (
  variables: DeleteAppTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteAppTypesDocument.toString(), variables, next)

export const DeleteActionTypes = (
  variables: DeleteActionTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteActionTypesDocument.toString(), variables, next)

export const DeleteCodeMirrorTypes = (
  variables: DeleteCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteCodeMirrorTypesDocument.toString(), variables, next)
