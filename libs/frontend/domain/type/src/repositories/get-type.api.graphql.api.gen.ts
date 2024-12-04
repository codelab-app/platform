import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import {
  BaseTypeFragmentDoc,
  TypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RichTextTypeFragmentDoc,
} from '@codelab/shared/infra/gql'

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
} from '@codelab/shared/infra/gql'
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

export const getSdk = () => ({
  GetBaseTypes: (variables: GetBaseTypesQueryVariables) =>
    gqlRequest(GetBaseTypesDocument.toString(), variables),
  GetTypes: (variables: GetTypesQueryVariables) =>
    gqlRequest(GetTypesDocument.toString(), variables),
  GetDescendants: (variables: GetDescendantsQueryVariables) =>
    gqlRequest(GetDescendantsDocument.toString(), variables),
  GetPrimitiveTypes: (variables: GetPrimitiveTypesQueryVariables) =>
    gqlRequest(GetPrimitiveTypesDocument.toString(), variables),
  GetArrayTypes: (variables: GetArrayTypesQueryVariables) =>
    gqlRequest(GetArrayTypesDocument.toString(), variables),
  GetUnionTypes: (variables: GetUnionTypesQueryVariables) =>
    gqlRequest(GetUnionTypesDocument.toString(), variables),
  GetInterfaceTypes: (variables: GetInterfaceTypesQueryVariables) =>
    gqlRequest(GetInterfaceTypesDocument.toString(), variables),
  GetElementTypes: (variables: GetElementTypesQueryVariables) =>
    gqlRequest(GetElementTypesDocument.toString(), variables),
  GetRenderPropTypes: (variables: GetRenderPropTypesQueryVariables) =>
    gqlRequest(GetRenderPropTypesDocument.toString(), variables),
  GetReactNodeTypes: (variables: GetReactNodeTypesQueryVariables) =>
    gqlRequest(GetReactNodeTypesDocument.toString(), variables),
  GetRichTextTypes: (variables: GetRichTextTypesQueryVariables) =>
    gqlRequest(GetRichTextTypesDocument.toString(), variables),
  GetEnumTypes: (variables: GetEnumTypesQueryVariables) =>
    gqlRequest(GetEnumTypesDocument.toString(), variables),
  GetLambdaTypes: (variables: GetLambdaTypesQueryVariables) =>
    gqlRequest(GetLambdaTypesDocument.toString(), variables),
  GetPageTypes: (variables: GetPageTypesQueryVariables) =>
    gqlRequest(GetPageTypesDocument.toString(), variables),
  GetAppTypes: (variables: GetAppTypesQueryVariables) =>
    gqlRequest(GetAppTypesDocument.toString(), variables),
  GetActionTypes: (variables: GetActionTypesQueryVariables) =>
    gqlRequest(GetActionTypesDocument.toString(), variables),
  GetCodeMirrorTypes: (variables: GetCodeMirrorTypesQueryVariables) =>
    gqlRequest(GetCodeMirrorTypesDocument.toString(), variables),
})
