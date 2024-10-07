import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'

import {
  type CreatePrimitiveTypesMutationVariables,
  type CreateArrayTypesMutationVariables,
  type CreateUnionTypesMutationVariables,
  type CreateInterfaceTypesMutationVariables,
  type CreateElementTypesMutationVariables,
  type CreateRenderPropTypesMutationVariables,
  type CreateReactNodeTypesMutationVariables,
  type CreateEnumTypesMutationVariables,
  type CreateLambdaTypesMutationVariables,
  type CreatePageTypesMutationVariables,
  type CreateAppTypesMutationVariables,
  type CreateRichTextTypesMutationVariables,
  type CreateActionTypesMutationVariables,
  type CreateCodeMirrorTypesMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  CreatePrimitiveTypesDocument,
  CreateArrayTypesDocument,
  CreateUnionTypesDocument,
  CreateInterfaceTypesDocument,
  CreateElementTypesDocument,
  CreateRenderPropTypesDocument,
  CreateReactNodeTypesDocument,
  CreateEnumTypesDocument,
  CreateLambdaTypesDocument,
  CreatePageTypesDocument,
  CreateAppTypesDocument,
  CreateRichTextTypesDocument,
  CreateActionTypesDocument,
  CreateCodeMirrorTypesDocument,
} from './create-type.api.documents.graphql.gen'

export const CreatePrimitiveTypes = (
  variables: CreatePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreatePrimitiveTypesDocument.toString(), variables, next)

export const CreateArrayTypes = (
  variables: CreateArrayTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateArrayTypesDocument.toString(), variables, next)

export const CreateUnionTypes = (
  variables: CreateUnionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateUnionTypesDocument.toString(), variables, next)

export const CreateInterfaceTypes = (
  variables: CreateInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateInterfaceTypesDocument.toString(), variables, next)

export const CreateElementTypes = (
  variables: CreateElementTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateElementTypesDocument.toString(), variables, next)

export const CreateRenderPropTypes = (
  variables: CreateRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateRenderPropTypesDocument.toString(), variables, next)

export const CreateReactNodeTypes = (
  variables: CreateReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateReactNodeTypesDocument.toString(), variables, next)

export const CreateEnumTypes = (
  variables: CreateEnumTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateEnumTypesDocument.toString(), variables, next)

export const CreateLambdaTypes = (
  variables: CreateLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateLambdaTypesDocument.toString(), variables, next)

export const CreatePageTypes = (
  variables: CreatePageTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreatePageTypesDocument.toString(), variables, next)

export const CreateAppTypes = (
  variables: CreateAppTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateAppTypesDocument.toString(), variables, next)

export const CreateRichTextTypes = (
  variables: CreateRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateRichTextTypesDocument.toString(), variables, next)

export const CreateActionTypes = (
  variables: CreateActionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateActionTypesDocument.toString(), variables, next)

export const CreateCodeMirrorTypes = (
  variables: CreateCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateCodeMirrorTypesDocument.toString(), variables, next)
