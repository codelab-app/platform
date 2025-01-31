import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { DeletePrimitiveTypesDocument, DeleteArrayTypesDocument, DeleteReactNodeTypesDocument, DeleteUnionTypesDocument, DeleteInterfaceTypesDocument, DeleteElementTypesDocument, DeleteRenderPropTypesDocument, DeleteRichTextTypesDocument, DeleteEnumTypesDocument, DeleteLambdaTypesDocument, DeletePageTypesDocument, DeleteAppTypesDocument, DeleteActionTypesDocument, DeleteCodeMirrorTypesDocument } from '@codelab/shared/infra/gqlgen'



export const DeletePrimitiveTypes = (variables: Types.DeletePrimitiveTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeletePrimitiveTypesDocument.toString(), variables, next)
export const DeleteArrayTypes = (variables: Types.DeleteArrayTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteArrayTypesDocument.toString(), variables, next)
export const DeleteReactNodeTypes = (variables: Types.DeleteReactNodeTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteReactNodeTypesDocument.toString(), variables, next)
export const DeleteUnionTypes = (variables: Types.DeleteUnionTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteUnionTypesDocument.toString(), variables, next)
export const DeleteInterfaceTypes = (variables: Types.DeleteInterfaceTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteInterfaceTypesDocument.toString(), variables, next)
export const DeleteElementTypes = (variables: Types.DeleteElementTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteElementTypesDocument.toString(), variables, next)
export const DeleteRenderPropTypes = (variables: Types.DeleteRenderPropTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteRenderPropTypesDocument.toString(), variables, next)
export const DeleteRichTextTypes = (variables: Types.DeleteRichTextTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteRichTextTypesDocument.toString(), variables, next)
export const DeleteEnumTypes = (variables: Types.DeleteEnumTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteEnumTypesDocument.toString(), variables, next)
export const DeleteLambdaTypes = (variables: Types.DeleteLambdaTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteLambdaTypesDocument.toString(), variables, next)
export const DeletePageTypes = (variables: Types.DeletePageTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeletePageTypesDocument.toString(), variables, next)
export const DeleteAppTypes = (variables: Types.DeleteAppTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteAppTypesDocument.toString(), variables, next)
export const DeleteActionTypes = (variables: Types.DeleteActionTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteActionTypesDocument.toString(), variables, next)
export const DeleteCodeMirrorTypes = (variables: Types.DeleteCodeMirrorTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteCodeMirrorTypesDocument.toString(), variables, next)