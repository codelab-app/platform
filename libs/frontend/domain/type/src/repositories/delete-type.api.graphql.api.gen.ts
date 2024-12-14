import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type DeletePrimitiveTypesMutationVariables,
  type DeleteArrayTypesMutationVariables,
  type DeleteReactNodeTypesMutationVariables,
  type DeleteUnionTypesMutationVariables,
  type DeleteInterfaceTypesMutationVariables,
  type DeleteElementTypesMutationVariables,
  type DeleteRenderPropTypesMutationVariables,
  type DeleteRichTextTypesMutationVariables,
  type DeleteEnumTypesMutationVariables,
  type DeleteLambdaTypesMutationVariables,
  type DeletePageTypesMutationVariables,
  type DeleteAppTypesMutationVariables,
  type DeleteActionTypesMutationVariables,
  type DeleteCodeMirrorTypesMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  DeletePrimitiveTypesDocument,
  DeleteArrayTypesDocument,
  DeleteReactNodeTypesDocument,
  DeleteUnionTypesDocument,
  DeleteInterfaceTypesDocument,
  DeleteElementTypesDocument,
  DeleteRenderPropTypesDocument,
  DeleteRichTextTypesDocument,
  DeleteEnumTypesDocument,
  DeleteLambdaTypesDocument,
  DeletePageTypesDocument,
  DeleteAppTypesDocument,
  DeleteActionTypesDocument,
  DeleteCodeMirrorTypesDocument,
} from './delete-type.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  DeletePrimitiveTypes: (variables: DeletePrimitiveTypesMutationVariables) =>
    gqlRequest(client, DeletePrimitiveTypesDocument.toString(), variables),
  DeleteArrayTypes: (variables: DeleteArrayTypesMutationVariables) =>
    gqlRequest(client, DeleteArrayTypesDocument.toString(), variables),
  DeleteReactNodeTypes: (variables: DeleteReactNodeTypesMutationVariables) =>
    gqlRequest(client, DeleteReactNodeTypesDocument.toString(), variables),
  DeleteUnionTypes: (variables: DeleteUnionTypesMutationVariables) =>
    gqlRequest(client, DeleteUnionTypesDocument.toString(), variables),
  DeleteInterfaceTypes: (variables: DeleteInterfaceTypesMutationVariables) =>
    gqlRequest(client, DeleteInterfaceTypesDocument.toString(), variables),
  DeleteElementTypes: (variables: DeleteElementTypesMutationVariables) =>
    gqlRequest(client, DeleteElementTypesDocument.toString(), variables),
  DeleteRenderPropTypes: (variables: DeleteRenderPropTypesMutationVariables) =>
    gqlRequest(client, DeleteRenderPropTypesDocument.toString(), variables),
  DeleteRichTextTypes: (variables: DeleteRichTextTypesMutationVariables) =>
    gqlRequest(client, DeleteRichTextTypesDocument.toString(), variables),
  DeleteEnumTypes: (variables: DeleteEnumTypesMutationVariables) =>
    gqlRequest(client, DeleteEnumTypesDocument.toString(), variables),
  DeleteLambdaTypes: (variables: DeleteLambdaTypesMutationVariables) =>
    gqlRequest(client, DeleteLambdaTypesDocument.toString(), variables),
  DeletePageTypes: (variables: DeletePageTypesMutationVariables) =>
    gqlRequest(client, DeletePageTypesDocument.toString(), variables),
  DeleteAppTypes: (variables: DeleteAppTypesMutationVariables) =>
    gqlRequest(client, DeleteAppTypesDocument.toString(), variables),
  DeleteActionTypes: (variables: DeleteActionTypesMutationVariables) =>
    gqlRequest(client, DeleteActionTypesDocument.toString(), variables),
  DeleteCodeMirrorTypes: (variables: DeleteCodeMirrorTypesMutationVariables) =>
    gqlRequest(client, DeleteCodeMirrorTypesDocument.toString(), variables),
})
