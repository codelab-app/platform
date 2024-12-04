import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'

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
} from './create-type.api.graphql.docs.gen'

export const CreatePrimitiveTypes = (
  variables: CreatePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreatePrimitiveTypesDocument.toString(), variables, next)

export const CreateArrayTypes = (
  variables: CreateArrayTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateArrayTypesDocument.toString(), variables, next)

export const CreateUnionTypes = (
  variables: CreateUnionTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateUnionTypesDocument.toString(), variables, next)

export const CreateInterfaceTypes = (
  variables: CreateInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateInterfaceTypesDocument.toString(), variables, next)

export const CreateElementTypes = (
  variables: CreateElementTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateElementTypesDocument.toString(), variables, next)

export const CreateRenderPropTypes = (
  variables: CreateRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateRenderPropTypesDocument.toString(), variables, next)

export const CreateReactNodeTypes = (
  variables: CreateReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateReactNodeTypesDocument.toString(), variables, next)

export const CreateEnumTypes = (
  variables: CreateEnumTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateEnumTypesDocument.toString(), variables, next)

export const CreateLambdaTypes = (
  variables: CreateLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateLambdaTypesDocument.toString(), variables, next)

export const CreatePageTypes = (
  variables: CreatePageTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreatePageTypesDocument.toString(), variables, next)

export const CreateAppTypes = (
  variables: CreateAppTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateAppTypesDocument.toString(), variables, next)

export const CreateRichTextTypes = (
  variables: CreateRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateRichTextTypesDocument.toString(), variables, next)

export const CreateActionTypes = (
  variables: CreateActionTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateActionTypesDocument.toString(), variables, next)

export const CreateCodeMirrorTypes = (
  variables: CreateCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateCodeMirrorTypesDocument.toString(), variables, next)
