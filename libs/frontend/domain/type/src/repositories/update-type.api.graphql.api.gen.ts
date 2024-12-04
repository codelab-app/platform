import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
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
} from '@codelab/shared/infra/gql'
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

export const getSdk = () => ({
  UpdatePrimitiveTypes: (variables: UpdatePrimitiveTypesMutationVariables) =>
    gqlRequest(UpdatePrimitiveTypesDocument.toString(), variables),
  UpdateArrayTypes: (variables: UpdateArrayTypesMutationVariables) =>
    gqlRequest(UpdateArrayTypesDocument.toString(), variables),
  UpdateUnionTypes: (variables: UpdateUnionTypesMutationVariables) =>
    gqlRequest(UpdateUnionTypesDocument.toString(), variables),
  UpdateInterfaceTypes: (variables: UpdateInterfaceTypesMutationVariables) =>
    gqlRequest(UpdateInterfaceTypesDocument.toString(), variables),
  UpdateReactNodeTypes: (variables: UpdateReactNodeTypesMutationVariables) =>
    gqlRequest(UpdateReactNodeTypesDocument.toString(), variables),
  UpdateElementTypes: (variables: UpdateElementTypesMutationVariables) =>
    gqlRequest(UpdateElementTypesDocument.toString(), variables),
  UpdateRenderPropTypes: (variables: UpdateRenderPropTypesMutationVariables) =>
    gqlRequest(UpdateRenderPropTypesDocument.toString(), variables),
  UpdateEnumTypes: (variables: UpdateEnumTypesMutationVariables) =>
    gqlRequest(UpdateEnumTypesDocument.toString(), variables),
  UpdateLambdaTypes: (variables: UpdateLambdaTypesMutationVariables) =>
    gqlRequest(UpdateLambdaTypesDocument.toString(), variables),
  UpdatePageTypes: (variables: UpdatePageTypesMutationVariables) =>
    gqlRequest(UpdatePageTypesDocument.toString(), variables),
  UpdateAppTypes: (variables: UpdateAppTypesMutationVariables) =>
    gqlRequest(UpdateAppTypesDocument.toString(), variables),
  UpdateRichTextTypes: (variables: UpdateRichTextTypesMutationVariables) =>
    gqlRequest(UpdateRichTextTypesDocument.toString(), variables),
  UpdateActionTypes: (variables: UpdateActionTypesMutationVariables) =>
    gqlRequest(UpdateActionTypesDocument.toString(), variables),
  UpdateCodeMirrorTypes: (variables: UpdateCodeMirrorTypesMutationVariables) =>
    gqlRequest(UpdateCodeMirrorTypesDocument.toString(), variables),
})
