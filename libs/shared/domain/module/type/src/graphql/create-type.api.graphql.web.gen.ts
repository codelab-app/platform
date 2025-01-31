import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreatePrimitiveTypesDocument, CreateArrayTypesDocument, CreateUnionTypesDocument, CreateInterfaceTypesDocument, CreateElementTypesDocument, CreateRenderPropTypesDocument, CreateReactNodeTypesDocument, CreateEnumTypesDocument, CreateLambdaTypesDocument, CreatePageTypesDocument, CreateAppTypesDocument, CreateRichTextTypesDocument, CreateActionTypesDocument, CreateCodeMirrorTypesDocument } from '@codelab/shared/infra/gqlgen'



export const CreatePrimitiveTypes = (variables: Types.CreatePrimitiveTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreatePrimitiveTypesDocument.toString(), variables, next)
export const CreateArrayTypes = (variables: Types.CreateArrayTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateArrayTypesDocument.toString(), variables, next)
export const CreateUnionTypes = (variables: Types.CreateUnionTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateUnionTypesDocument.toString(), variables, next)
export const CreateInterfaceTypes = (variables: Types.CreateInterfaceTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateInterfaceTypesDocument.toString(), variables, next)
export const CreateElementTypes = (variables: Types.CreateElementTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateElementTypesDocument.toString(), variables, next)
export const CreateRenderPropTypes = (variables: Types.CreateRenderPropTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateRenderPropTypesDocument.toString(), variables, next)
export const CreateReactNodeTypes = (variables: Types.CreateReactNodeTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateReactNodeTypesDocument.toString(), variables, next)
export const CreateEnumTypes = (variables: Types.CreateEnumTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateEnumTypesDocument.toString(), variables, next)
export const CreateLambdaTypes = (variables: Types.CreateLambdaTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateLambdaTypesDocument.toString(), variables, next)
export const CreatePageTypes = (variables: Types.CreatePageTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreatePageTypesDocument.toString(), variables, next)
export const CreateAppTypes = (variables: Types.CreateAppTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateAppTypesDocument.toString(), variables, next)
export const CreateRichTextTypes = (variables: Types.CreateRichTextTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateRichTextTypesDocument.toString(), variables, next)
export const CreateActionTypes = (variables: Types.CreateActionTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateActionTypesDocument.toString(), variables, next)
export const CreateCodeMirrorTypes = (variables: Types.CreateCodeMirrorTypesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateCodeMirrorTypesDocument.toString(), variables, next)