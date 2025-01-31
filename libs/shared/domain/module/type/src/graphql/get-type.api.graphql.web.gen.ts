import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetBaseTypesDocument, GetTypesDocument, GetDescendantsDocument, GetPrimitiveTypesDocument, GetArrayTypesDocument, GetUnionTypesDocument, GetInterfaceTypesDocument, GetElementTypesDocument, GetRenderPropTypesDocument, GetReactNodeTypesDocument, GetRichTextTypesDocument, GetEnumTypesDocument, GetLambdaTypesDocument, GetPageTypesDocument, GetAppTypesDocument, GetActionTypesDocument, GetCodeMirrorTypesDocument } from '@codelab/shared/infra/gqlgen'



export const GetBaseTypes = (variables: Types.GetBaseTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetBaseTypesDocument.toString(), variables, next)
export const GetTypes = (variables: Types.GetTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetTypesDocument.toString(), variables, next)
export const GetDescendants = (variables: Types.GetDescendantsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetDescendantsDocument.toString(), variables, next)
export const GetPrimitiveTypes = (variables: Types.GetPrimitiveTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetPrimitiveTypesDocument.toString(), variables, next)
export const GetArrayTypes = (variables: Types.GetArrayTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetArrayTypesDocument.toString(), variables, next)
export const GetUnionTypes = (variables: Types.GetUnionTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetUnionTypesDocument.toString(), variables, next)
export const GetInterfaceTypes = (variables: Types.GetInterfaceTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetInterfaceTypesDocument.toString(), variables, next)
export const GetElementTypes = (variables: Types.GetElementTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetElementTypesDocument.toString(), variables, next)
export const GetRenderPropTypes = (variables: Types.GetRenderPropTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetRenderPropTypesDocument.toString(), variables, next)
export const GetReactNodeTypes = (variables: Types.GetReactNodeTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetReactNodeTypesDocument.toString(), variables, next)
export const GetRichTextTypes = (variables: Types.GetRichTextTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetRichTextTypesDocument.toString(), variables, next)
export const GetEnumTypes = (variables: Types.GetEnumTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetEnumTypesDocument.toString(), variables, next)
export const GetLambdaTypes = (variables: Types.GetLambdaTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetLambdaTypesDocument.toString(), variables, next)
export const GetPageTypes = (variables: Types.GetPageTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetPageTypesDocument.toString(), variables, next)
export const GetAppTypes = (variables: Types.GetAppTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetAppTypesDocument.toString(), variables, next)
export const GetActionTypes = (variables: Types.GetActionTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetActionTypesDocument.toString(), variables, next)
export const GetCodeMirrorTypes = (variables: Types.GetCodeMirrorTypesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetCodeMirrorTypesDocument.toString(), variables, next)