import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { UpdatePrimitiveTypesDocument, UpdateArrayTypesDocument, UpdateUnionTypesDocument, UpdateInterfaceTypesDocument, UpdateReactNodeTypesDocument, UpdateElementTypesDocument, UpdateRenderPropTypesDocument, UpdateEnumTypesDocument, UpdateLambdaTypesDocument, UpdatePageTypesDocument, UpdateAppTypesDocument, UpdateRichTextTypesDocument, UpdateActionTypesDocument, UpdateCodeMirrorTypesDocument } from '@codelab/shared/infra/gqlgen'

export const UpdatePrimitiveTypes = (variables: Types.UpdatePrimitiveTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdatePrimitiveTypesDocument.toString(), variables, next)
export const UpdateArrayTypes = (variables: Types.UpdateArrayTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateArrayTypesDocument.toString(), variables, next)
export const UpdateUnionTypes = (variables: Types.UpdateUnionTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateUnionTypesDocument.toString(), variables, next)
export const UpdateInterfaceTypes = (variables: Types.UpdateInterfaceTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateInterfaceTypesDocument.toString(), variables, next)
export const UpdateReactNodeTypes = (variables: Types.UpdateReactNodeTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateReactNodeTypesDocument.toString(), variables, next)
export const UpdateElementTypes = (variables: Types.UpdateElementTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateElementTypesDocument.toString(), variables, next)
export const UpdateRenderPropTypes = (variables: Types.UpdateRenderPropTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateRenderPropTypesDocument.toString(), variables, next)
export const UpdateEnumTypes = (variables: Types.UpdateEnumTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateEnumTypesDocument.toString(), variables, next)
export const UpdateLambdaTypes = (variables: Types.UpdateLambdaTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateLambdaTypesDocument.toString(), variables, next)
export const UpdatePageTypes = (variables: Types.UpdatePageTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdatePageTypesDocument.toString(), variables, next)
export const UpdateAppTypes = (variables: Types.UpdateAppTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateAppTypesDocument.toString(), variables, next)
export const UpdateRichTextTypes = (variables: Types.UpdateRichTextTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateRichTextTypesDocument.toString(), variables, next)
export const UpdateActionTypes = (variables: Types.UpdateActionTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateActionTypesDocument.toString(), variables, next)
export const UpdateCodeMirrorTypes = (variables: Types.UpdateCodeMirrorTypesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateCodeMirrorTypesDocument.toString(), variables, next)
