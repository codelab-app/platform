import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { CreatePrimitiveTypesDocument, CreateArrayTypesDocument, CreateUnionTypesDocument, CreateInterfaceTypesDocument, CreateElementTypesDocument, CreateRenderPropTypesDocument, CreateReactNodeTypesDocument, CreateEnumTypesDocument, CreateLambdaTypesDocument, CreatePageTypesDocument, CreateAppTypesDocument, CreateRichTextTypesDocument, CreateActionTypesDocument, CreateCodeMirrorTypesDocument } from '@codelab/shared-infra-gqlgen'

export const CreatePrimitiveTypes = (variables: Types.CreatePrimitiveTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreatePrimitiveTypesDocument.toString(), variables, next)
export const CreateArrayTypes = (variables: Types.CreateArrayTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateArrayTypesDocument.toString(), variables, next)
export const CreateUnionTypes = (variables: Types.CreateUnionTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateUnionTypesDocument.toString(), variables, next)
export const CreateInterfaceTypes = (variables: Types.CreateInterfaceTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateInterfaceTypesDocument.toString(), variables, next)
export const CreateElementTypes = (variables: Types.CreateElementTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateElementTypesDocument.toString(), variables, next)
export const CreateRenderPropTypes = (variables: Types.CreateRenderPropTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateRenderPropTypesDocument.toString(), variables, next)
export const CreateReactNodeTypes = (variables: Types.CreateReactNodeTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateReactNodeTypesDocument.toString(), variables, next)
export const CreateEnumTypes = (variables: Types.CreateEnumTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateEnumTypesDocument.toString(), variables, next)
export const CreateLambdaTypes = (variables: Types.CreateLambdaTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateLambdaTypesDocument.toString(), variables, next)
export const CreatePageTypes = (variables: Types.CreatePageTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreatePageTypesDocument.toString(), variables, next)
export const CreateAppTypes = (variables: Types.CreateAppTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateAppTypesDocument.toString(), variables, next)
export const CreateRichTextTypes = (variables: Types.CreateRichTextTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateRichTextTypesDocument.toString(), variables, next)
export const CreateActionTypes = (variables: Types.CreateActionTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateActionTypesDocument.toString(), variables, next)
export const CreateCodeMirrorTypes = (variables: Types.CreateCodeMirrorTypesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateCodeMirrorTypesDocument.toString(), variables, next)
