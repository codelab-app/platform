import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import {
  ActionTypeFragmentDoc,
  AppBuilderFragmentDoc,
  CodeMirrorTypeFragmentDoc,
  PrimitiveTypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RenderPropTypeFragmentDoc,
  RichTextTypeFragmentDoc,
  AtomBuilderFragmentDoc,
  AtomProductionFragmentDoc,
  ResourceFragmentDoc,
  AuthGuardFragmentDoc,
  ComponentBuilderFragmentDoc,
  RedirectFragmentDoc,
  RedirectPreviewFragmentDoc,
} from '@codelab/shared/infra/gql'

import { type GetAppBuilderQueryVariables } from '@codelab/shared/infra/gql'
import { GetAppBuilderDocument } from './app-builder.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  GetAppBuilder: (variables: GetAppBuilderQueryVariables) =>
    gqlRequest(client, GetAppBuilderDocument.toString(), variables),
})
