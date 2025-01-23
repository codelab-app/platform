import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
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
} from '@codelab/shared/infra/gqlgen'
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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreatePrimitiveTypes: (variables: CreatePrimitiveTypesMutationVariables) =>
    gqlRequest(client, CreatePrimitiveTypesDocument.toString(), variables),
  CreateArrayTypes: (variables: CreateArrayTypesMutationVariables) =>
    gqlRequest(client, CreateArrayTypesDocument.toString(), variables),
  CreateUnionTypes: (variables: CreateUnionTypesMutationVariables) =>
    gqlRequest(client, CreateUnionTypesDocument.toString(), variables),
  CreateInterfaceTypes: (variables: CreateInterfaceTypesMutationVariables) =>
    gqlRequest(client, CreateInterfaceTypesDocument.toString(), variables),
  CreateElementTypes: (variables: CreateElementTypesMutationVariables) =>
    gqlRequest(client, CreateElementTypesDocument.toString(), variables),
  CreateRenderPropTypes: (variables: CreateRenderPropTypesMutationVariables) =>
    gqlRequest(client, CreateRenderPropTypesDocument.toString(), variables),
  CreateReactNodeTypes: (variables: CreateReactNodeTypesMutationVariables) =>
    gqlRequest(client, CreateReactNodeTypesDocument.toString(), variables),
  CreateEnumTypes: (variables: CreateEnumTypesMutationVariables) =>
    gqlRequest(client, CreateEnumTypesDocument.toString(), variables),
  CreateLambdaTypes: (variables: CreateLambdaTypesMutationVariables) =>
    gqlRequest(client, CreateLambdaTypesDocument.toString(), variables),
  CreatePageTypes: (variables: CreatePageTypesMutationVariables) =>
    gqlRequest(client, CreatePageTypesDocument.toString(), variables),
  CreateAppTypes: (variables: CreateAppTypesMutationVariables) =>
    gqlRequest(client, CreateAppTypesDocument.toString(), variables),
  CreateRichTextTypes: (variables: CreateRichTextTypesMutationVariables) =>
    gqlRequest(client, CreateRichTextTypesDocument.toString(), variables),
  CreateActionTypes: (variables: CreateActionTypesMutationVariables) =>
    gqlRequest(client, CreateActionTypesDocument.toString(), variables),
  CreateCodeMirrorTypes: (variables: CreateCodeMirrorTypesMutationVariables) =>
    gqlRequest(client, CreateCodeMirrorTypesDocument.toString(), variables),
})
