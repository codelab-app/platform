import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import {
  BaseTypeFragmentDoc,
  TypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RichTextTypeFragmentDoc,
} from '@codelab/shared/infra/gqlgen'

import {
  type GetBaseTypesQueryVariables,
  type GetTypesQueryVariables,
  type GetDescendantsQueryVariables,
  type GetPrimitiveTypesQueryVariables,
  type GetArrayTypesQueryVariables,
  type GetUnionTypesQueryVariables,
  type GetInterfaceTypesQueryVariables,
  type GetElementTypesQueryVariables,
  type GetRenderPropTypesQueryVariables,
  type GetReactNodeTypesQueryVariables,
  type GetRichTextTypesQueryVariables,
  type GetEnumTypesQueryVariables,
  type GetLambdaTypesQueryVariables,
  type GetPageTypesQueryVariables,
  type GetAppTypesQueryVariables,
  type GetActionTypesQueryVariables,
  type GetCodeMirrorTypesQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  GetBaseTypesDocument,
  GetTypesDocument,
  GetDescendantsDocument,
  GetPrimitiveTypesDocument,
  GetArrayTypesDocument,
  GetUnionTypesDocument,
  GetInterfaceTypesDocument,
  GetElementTypesDocument,
  GetRenderPropTypesDocument,
  GetReactNodeTypesDocument,
  GetRichTextTypesDocument,
  GetEnumTypesDocument,
  GetLambdaTypesDocument,
  GetPageTypesDocument,
  GetAppTypesDocument,
  GetActionTypesDocument,
  GetCodeMirrorTypesDocument,
} from './get-type.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  GetBaseTypes: (variables: GetBaseTypesQueryVariables) =>
    gqlRequest(client, GetBaseTypesDocument.toString(), variables),
  GetTypes: (variables: GetTypesQueryVariables) =>
    gqlRequest(client, GetTypesDocument.toString(), variables),
  GetDescendants: (variables: GetDescendantsQueryVariables) =>
    gqlRequest(client, GetDescendantsDocument.toString(), variables),
  GetPrimitiveTypes: (variables: GetPrimitiveTypesQueryVariables) =>
    gqlRequest(client, GetPrimitiveTypesDocument.toString(), variables),
  GetArrayTypes: (variables: GetArrayTypesQueryVariables) =>
    gqlRequest(client, GetArrayTypesDocument.toString(), variables),
  GetUnionTypes: (variables: GetUnionTypesQueryVariables) =>
    gqlRequest(client, GetUnionTypesDocument.toString(), variables),
  GetInterfaceTypes: (variables: GetInterfaceTypesQueryVariables) =>
    gqlRequest(client, GetInterfaceTypesDocument.toString(), variables),
  GetElementTypes: (variables: GetElementTypesQueryVariables) =>
    gqlRequest(client, GetElementTypesDocument.toString(), variables),
  GetRenderPropTypes: (variables: GetRenderPropTypesQueryVariables) =>
    gqlRequest(client, GetRenderPropTypesDocument.toString(), variables),
  GetReactNodeTypes: (variables: GetReactNodeTypesQueryVariables) =>
    gqlRequest(client, GetReactNodeTypesDocument.toString(), variables),
  GetRichTextTypes: (variables: GetRichTextTypesQueryVariables) =>
    gqlRequest(client, GetRichTextTypesDocument.toString(), variables),
  GetEnumTypes: (variables: GetEnumTypesQueryVariables) =>
    gqlRequest(client, GetEnumTypesDocument.toString(), variables),
  GetLambdaTypes: (variables: GetLambdaTypesQueryVariables) =>
    gqlRequest(client, GetLambdaTypesDocument.toString(), variables),
  GetPageTypes: (variables: GetPageTypesQueryVariables) =>
    gqlRequest(client, GetPageTypesDocument.toString(), variables),
  GetAppTypes: (variables: GetAppTypesQueryVariables) =>
    gqlRequest(client, GetAppTypesDocument.toString(), variables),
  GetActionTypes: (variables: GetActionTypesQueryVariables) =>
    gqlRequest(client, GetActionTypesDocument.toString(), variables),
  GetCodeMirrorTypes: (variables: GetCodeMirrorTypesQueryVariables) =>
    gqlRequest(client, GetCodeMirrorTypesDocument.toString(), variables),
})
