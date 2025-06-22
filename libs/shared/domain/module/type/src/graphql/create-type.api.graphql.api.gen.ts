import * as Types from '@codelab/shared-infra-gqlgen'

import { gqlRequest } from '@codelab/shared-infra-fetch'
import { GraphQLClient } from 'graphql-request'
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
} from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({
  CreatePrimitiveTypes: (
    variables: Types.CreatePrimitiveTypesMutationVariables,
  ) => gqlRequest(client, CreatePrimitiveTypesDocument.toString(), variables),
  CreateArrayTypes: (variables: Types.CreateArrayTypesMutationVariables) =>
    gqlRequest(client, CreateArrayTypesDocument.toString(), variables),
  CreateUnionTypes: (variables: Types.CreateUnionTypesMutationVariables) =>
    gqlRequest(client, CreateUnionTypesDocument.toString(), variables),
  CreateInterfaceTypes: (
    variables: Types.CreateInterfaceTypesMutationVariables,
  ) => gqlRequest(client, CreateInterfaceTypesDocument.toString(), variables),
  CreateElementTypes: (variables: Types.CreateElementTypesMutationVariables) =>
    gqlRequest(client, CreateElementTypesDocument.toString(), variables),
  CreateRenderPropTypes: (
    variables: Types.CreateRenderPropTypesMutationVariables,
  ) => gqlRequest(client, CreateRenderPropTypesDocument.toString(), variables),
  CreateReactNodeTypes: (
    variables: Types.CreateReactNodeTypesMutationVariables,
  ) => gqlRequest(client, CreateReactNodeTypesDocument.toString(), variables),
  CreateEnumTypes: (variables: Types.CreateEnumTypesMutationVariables) =>
    gqlRequest(client, CreateEnumTypesDocument.toString(), variables),
  CreateLambdaTypes: (variables: Types.CreateLambdaTypesMutationVariables) =>
    gqlRequest(client, CreateLambdaTypesDocument.toString(), variables),
  CreatePageTypes: (variables: Types.CreatePageTypesMutationVariables) =>
    gqlRequest(client, CreatePageTypesDocument.toString(), variables),
  CreateAppTypes: (variables: Types.CreateAppTypesMutationVariables) =>
    gqlRequest(client, CreateAppTypesDocument.toString(), variables),
  CreateRichTextTypes: (
    variables: Types.CreateRichTextTypesMutationVariables,
  ) => gqlRequest(client, CreateRichTextTypesDocument.toString(), variables),
  CreateActionTypes: (variables: Types.CreateActionTypesMutationVariables) =>
    gqlRequest(client, CreateActionTypesDocument.toString(), variables),
  CreateCodeMirrorTypes: (
    variables: Types.CreateCodeMirrorTypesMutationVariables,
  ) => gqlRequest(client, CreateCodeMirrorTypesDocument.toString(), variables),
})
