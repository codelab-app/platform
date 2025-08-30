import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { GetBaseTypesDocument, GetTypesDocument, GetDescendantsDocument, GetPrimitiveTypesDocument, GetArrayTypesDocument, GetUnionTypesDocument, GetInterfaceTypesDocument, GetElementTypesDocument, GetRenderPropTypesDocument, GetReactNodeTypesDocument, GetRichTextTypesDocument, GetEnumTypesDocument, GetLambdaTypesDocument, GetPageTypesDocument, GetAppTypesDocument, GetActionTypesDocument, GetCodeMirrorTypesDocument, GetUnknownTypesDocument } from '@codelab/shared-infra-gqlgen'

export const GetBaseTypes = (variables: Types.GetBaseTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetBaseTypesDocument.toString(), variables, next)
export const GetTypes = (variables: Types.GetTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetTypesDocument.toString(), variables, next)
export const GetDescendants = (variables: Types.GetDescendantsQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetDescendantsDocument.toString(), variables, next)
export const GetPrimitiveTypes = (variables: Types.GetPrimitiveTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetPrimitiveTypesDocument.toString(), variables, next)
export const GetArrayTypes = (variables: Types.GetArrayTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetArrayTypesDocument.toString(), variables, next)
export const GetUnionTypes = (variables: Types.GetUnionTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetUnionTypesDocument.toString(), variables, next)
export const GetInterfaceTypes = (variables: Types.GetInterfaceTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetInterfaceTypesDocument.toString(), variables, next)
export const GetElementTypes = (variables: Types.GetElementTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetElementTypesDocument.toString(), variables, next)
export const GetRenderPropTypes = (variables: Types.GetRenderPropTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetRenderPropTypesDocument.toString(), variables, next)
export const GetReactNodeTypes = (variables: Types.GetReactNodeTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetReactNodeTypesDocument.toString(), variables, next)
export const GetRichTextTypes = (variables: Types.GetRichTextTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetRichTextTypesDocument.toString(), variables, next)
export const GetEnumTypes = (variables: Types.GetEnumTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetEnumTypesDocument.toString(), variables, next)
export const GetLambdaTypes = (variables: Types.GetLambdaTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetLambdaTypesDocument.toString(), variables, next)
export const GetPageTypes = (variables: Types.GetPageTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetPageTypesDocument.toString(), variables, next)
export const GetAppTypes = (variables: Types.GetAppTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetAppTypesDocument.toString(), variables, next)
export const GetActionTypes = (variables: Types.GetActionTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetActionTypesDocument.toString(), variables, next)
export const GetCodeMirrorTypes = (variables: Types.GetCodeMirrorTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetCodeMirrorTypesDocument.toString(), variables, next)
export const GetUnknownTypes = (variables: Types.GetUnknownTypesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetUnknownTypesDocument.toString(), variables, next)
