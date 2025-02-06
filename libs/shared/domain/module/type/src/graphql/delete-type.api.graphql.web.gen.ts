import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { DeletePrimitiveTypesDocument, DeleteArrayTypesDocument, DeleteReactNodeTypesDocument, DeleteUnionTypesDocument, DeleteInterfaceTypesDocument, DeleteElementTypesDocument, DeleteRenderPropTypesDocument, DeleteRichTextTypesDocument, DeleteEnumTypesDocument, DeleteLambdaTypesDocument, DeletePageTypesDocument, DeleteAppTypesDocument, DeleteActionTypesDocument, DeleteCodeMirrorTypesDocument } from '@codelab/shared/infra/gqlgen'

export const DeletePrimitiveTypes = (variables: Types.DeletePrimitiveTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeletePrimitiveTypesDocument.toString(), variables, next)
export const DeleteArrayTypes = (variables: Types.DeleteArrayTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteArrayTypesDocument.toString(), variables, next)
export const DeleteReactNodeTypes = (variables: Types.DeleteReactNodeTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteReactNodeTypesDocument.toString(), variables, next)
export const DeleteUnionTypes = (variables: Types.DeleteUnionTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteUnionTypesDocument.toString(), variables, next)
export const DeleteInterfaceTypes = (variables: Types.DeleteInterfaceTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteInterfaceTypesDocument.toString(), variables, next)
export const DeleteElementTypes = (variables: Types.DeleteElementTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteElementTypesDocument.toString(), variables, next)
export const DeleteRenderPropTypes = (variables: Types.DeleteRenderPropTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteRenderPropTypesDocument.toString(), variables, next)
export const DeleteRichTextTypes = (variables: Types.DeleteRichTextTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteRichTextTypesDocument.toString(), variables, next)
export const DeleteEnumTypes = (variables: Types.DeleteEnumTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteEnumTypesDocument.toString(), variables, next)
export const DeleteLambdaTypes = (variables: Types.DeleteLambdaTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteLambdaTypesDocument.toString(), variables, next)
export const DeletePageTypes = (variables: Types.DeletePageTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeletePageTypesDocument.toString(), variables, next)
export const DeleteAppTypes = (variables: Types.DeleteAppTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteAppTypesDocument.toString(), variables, next)
export const DeleteActionTypes = (variables: Types.DeleteActionTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteActionTypesDocument.toString(), variables, next)
export const DeleteCodeMirrorTypes = (variables: Types.DeleteCodeMirrorTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteCodeMirrorTypesDocument.toString(), variables, next)
