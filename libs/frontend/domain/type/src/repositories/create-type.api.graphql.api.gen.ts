import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'

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

export const getSdk = () => ({
  CreatePrimitiveTypes: (variables: CreatePrimitiveTypesMutationVariables) =>
    gqlRequest(CreatePrimitiveTypesDocument.toString(), variables),
  CreateArrayTypes: (variables: CreateArrayTypesMutationVariables) =>
    gqlRequest(CreateArrayTypesDocument.toString(), variables),
  CreateUnionTypes: (variables: CreateUnionTypesMutationVariables) =>
    gqlRequest(CreateUnionTypesDocument.toString(), variables),
  CreateInterfaceTypes: (variables: CreateInterfaceTypesMutationVariables) =>
    gqlRequest(CreateInterfaceTypesDocument.toString(), variables),
  CreateElementTypes: (variables: CreateElementTypesMutationVariables) =>
    gqlRequest(CreateElementTypesDocument.toString(), variables),
  CreateRenderPropTypes: (variables: CreateRenderPropTypesMutationVariables) =>
    gqlRequest(CreateRenderPropTypesDocument.toString(), variables),
  CreateReactNodeTypes: (variables: CreateReactNodeTypesMutationVariables) =>
    gqlRequest(CreateReactNodeTypesDocument.toString(), variables),
  CreateEnumTypes: (variables: CreateEnumTypesMutationVariables) =>
    gqlRequest(CreateEnumTypesDocument.toString(), variables),
  CreateLambdaTypes: (variables: CreateLambdaTypesMutationVariables) =>
    gqlRequest(CreateLambdaTypesDocument.toString(), variables),
  CreatePageTypes: (variables: CreatePageTypesMutationVariables) =>
    gqlRequest(CreatePageTypesDocument.toString(), variables),
  CreateAppTypes: (variables: CreateAppTypesMutationVariables) =>
    gqlRequest(CreateAppTypesDocument.toString(), variables),
  CreateRichTextTypes: (variables: CreateRichTextTypesMutationVariables) =>
    gqlRequest(CreateRichTextTypesDocument.toString(), variables),
  CreateActionTypes: (variables: CreateActionTypesMutationVariables) =>
    gqlRequest(CreateActionTypesDocument.toString(), variables),
  CreateCodeMirrorTypes: (variables: CreateCodeMirrorTypesMutationVariables) =>
    gqlRequest(CreateCodeMirrorTypesDocument.toString(), variables),
})
