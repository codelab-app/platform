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

export const getSdk = () => ({
  DeletePrimitiveTypes: (variables: DeletePrimitiveTypesMutationVariables) =>
    gqlRequest(DeletePrimitiveTypesDocument.toString(), variables),
  DeleteArrayTypes: (variables: DeleteArrayTypesMutationVariables) =>
    gqlRequest(DeleteArrayTypesDocument.toString(), variables),
  DeleteReactNodeTypes: (variables: DeleteReactNodeTypesMutationVariables) =>
    gqlRequest(DeleteReactNodeTypesDocument.toString(), variables),
  DeleteUnionTypes: (variables: DeleteUnionTypesMutationVariables) =>
    gqlRequest(DeleteUnionTypesDocument.toString(), variables),
  DeleteInterfaceTypes: (variables: DeleteInterfaceTypesMutationVariables) =>
    gqlRequest(DeleteInterfaceTypesDocument.toString(), variables),
  DeleteElementTypes: (variables: DeleteElementTypesMutationVariables) =>
    gqlRequest(DeleteElementTypesDocument.toString(), variables),
  DeleteRenderPropTypes: (variables: DeleteRenderPropTypesMutationVariables) =>
    gqlRequest(DeleteRenderPropTypesDocument.toString(), variables),
  DeleteRichTextTypes: (variables: DeleteRichTextTypesMutationVariables) =>
    gqlRequest(DeleteRichTextTypesDocument.toString(), variables),
  DeleteEnumTypes: (variables: DeleteEnumTypesMutationVariables) =>
    gqlRequest(DeleteEnumTypesDocument.toString(), variables),
  DeleteLambdaTypes: (variables: DeleteLambdaTypesMutationVariables) =>
    gqlRequest(DeleteLambdaTypesDocument.toString(), variables),
  DeletePageTypes: (variables: DeletePageTypesMutationVariables) =>
    gqlRequest(DeletePageTypesDocument.toString(), variables),
  DeleteAppTypes: (variables: DeleteAppTypesMutationVariables) =>
    gqlRequest(DeleteAppTypesDocument.toString(), variables),
  DeleteActionTypes: (variables: DeleteActionTypesMutationVariables) =>
    gqlRequest(DeleteActionTypesDocument.toString(), variables),
  DeleteCodeMirrorTypes: (variables: DeleteCodeMirrorTypesMutationVariables) =>
    gqlRequest(DeleteCodeMirrorTypesDocument.toString(), variables),
})
