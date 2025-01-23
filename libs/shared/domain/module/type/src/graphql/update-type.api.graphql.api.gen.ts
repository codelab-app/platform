import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type UpdatePrimitiveTypesMutationVariables,
  type UpdateArrayTypesMutationVariables,
  type UpdateUnionTypesMutationVariables,
  type UpdateInterfaceTypesMutationVariables,
  type UpdateReactNodeTypesMutationVariables,
  type UpdateElementTypesMutationVariables,
  type UpdateRenderPropTypesMutationVariables,
  type UpdateEnumTypesMutationVariables,
  type UpdateLambdaTypesMutationVariables,
  type UpdatePageTypesMutationVariables,
  type UpdateAppTypesMutationVariables,
  type UpdateRichTextTypesMutationVariables,
  type UpdateActionTypesMutationVariables,
  type UpdateCodeMirrorTypesMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  UpdatePrimitiveTypesDocument,
  UpdateArrayTypesDocument,
  UpdateUnionTypesDocument,
  UpdateInterfaceTypesDocument,
  UpdateReactNodeTypesDocument,
  UpdateElementTypesDocument,
  UpdateRenderPropTypesDocument,
  UpdateEnumTypesDocument,
  UpdateLambdaTypesDocument,
  UpdatePageTypesDocument,
  UpdateAppTypesDocument,
  UpdateRichTextTypesDocument,
  UpdateActionTypesDocument,
  UpdateCodeMirrorTypesDocument,
} from './update-type.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  UpdatePrimitiveTypes: (variables: UpdatePrimitiveTypesMutationVariables) =>
    gqlRequest(client, UpdatePrimitiveTypesDocument.toString(), variables),
  UpdateArrayTypes: (variables: UpdateArrayTypesMutationVariables) =>
    gqlRequest(client, UpdateArrayTypesDocument.toString(), variables),
  UpdateUnionTypes: (variables: UpdateUnionTypesMutationVariables) =>
    gqlRequest(client, UpdateUnionTypesDocument.toString(), variables),
  UpdateInterfaceTypes: (variables: UpdateInterfaceTypesMutationVariables) =>
    gqlRequest(client, UpdateInterfaceTypesDocument.toString(), variables),
  UpdateReactNodeTypes: (variables: UpdateReactNodeTypesMutationVariables) =>
    gqlRequest(client, UpdateReactNodeTypesDocument.toString(), variables),
  UpdateElementTypes: (variables: UpdateElementTypesMutationVariables) =>
    gqlRequest(client, UpdateElementTypesDocument.toString(), variables),
  UpdateRenderPropTypes: (variables: UpdateRenderPropTypesMutationVariables) =>
    gqlRequest(client, UpdateRenderPropTypesDocument.toString(), variables),
  UpdateEnumTypes: (variables: UpdateEnumTypesMutationVariables) =>
    gqlRequest(client, UpdateEnumTypesDocument.toString(), variables),
  UpdateLambdaTypes: (variables: UpdateLambdaTypesMutationVariables) =>
    gqlRequest(client, UpdateLambdaTypesDocument.toString(), variables),
  UpdatePageTypes: (variables: UpdatePageTypesMutationVariables) =>
    gqlRequest(client, UpdatePageTypesDocument.toString(), variables),
  UpdateAppTypes: (variables: UpdateAppTypesMutationVariables) =>
    gqlRequest(client, UpdateAppTypesDocument.toString(), variables),
  UpdateRichTextTypes: (variables: UpdateRichTextTypesMutationVariables) =>
    gqlRequest(client, UpdateRichTextTypesDocument.toString(), variables),
  UpdateActionTypes: (variables: UpdateActionTypesMutationVariables) =>
    gqlRequest(client, UpdateActionTypesDocument.toString(), variables),
  UpdateCodeMirrorTypes: (variables: UpdateCodeMirrorTypesMutationVariables) =>
    gqlRequest(client, UpdateCodeMirrorTypesDocument.toString(), variables),
})
