import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { UpdatePrimitiveTypesDocument, UpdateArrayTypesDocument, UpdateUnionTypesDocument, UpdateInterfaceTypesDocument, UpdateReactNodeTypesDocument, UpdateElementTypesDocument, UpdateRenderPropTypesDocument, UpdateEnumTypesDocument, UpdateLambdaTypesDocument, UpdatePageTypesDocument, UpdateAppTypesDocument, UpdateRichTextTypesDocument, UpdateActionTypesDocument, UpdateCodeMirrorTypesDocument } from '@codelab/shared/infra/gqlgen'



export const UpdatePrimitiveTypes = (variables: Types.UpdatePrimitiveTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdatePrimitiveTypesDocument.toString(), variables, next)
export const UpdateArrayTypes = (variables: Types.UpdateArrayTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateArrayTypesDocument.toString(), variables, next)
export const UpdateUnionTypes = (variables: Types.UpdateUnionTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateUnionTypesDocument.toString(), variables, next)
export const UpdateInterfaceTypes = (variables: Types.UpdateInterfaceTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateInterfaceTypesDocument.toString(), variables, next)
export const UpdateReactNodeTypes = (variables: Types.UpdateReactNodeTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateReactNodeTypesDocument.toString(), variables, next)
export const UpdateElementTypes = (variables: Types.UpdateElementTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateElementTypesDocument.toString(), variables, next)
export const UpdateRenderPropTypes = (variables: Types.UpdateRenderPropTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateRenderPropTypesDocument.toString(), variables, next)
export const UpdateEnumTypes = (variables: Types.UpdateEnumTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateEnumTypesDocument.toString(), variables, next)
export const UpdateLambdaTypes = (variables: Types.UpdateLambdaTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateLambdaTypesDocument.toString(), variables, next)
export const UpdatePageTypes = (variables: Types.UpdatePageTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdatePageTypesDocument.toString(), variables, next)
export const UpdateAppTypes = (variables: Types.UpdateAppTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateAppTypesDocument.toString(), variables, next)
export const UpdateRichTextTypes = (variables: Types.UpdateRichTextTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateRichTextTypesDocument.toString(), variables, next)
export const UpdateActionTypes = (variables: Types.UpdateActionTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateActionTypesDocument.toString(), variables, next)
export const UpdateCodeMirrorTypes = (variables: Types.UpdateCodeMirrorTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateCodeMirrorTypesDocument.toString(), variables, next)