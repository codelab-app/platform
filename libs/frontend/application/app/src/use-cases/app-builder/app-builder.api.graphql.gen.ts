import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from '@codelab/shared/infra/gql'

import { type GetAppBuilderQueryVariables } from '@codelab/shared/infra/gql'
import { GetAppBuilderDocument } from './app-builder.api.documents.graphql.gen'

export const GetAppBuilder = (
  variables: GetAppBuilderQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAppBuilderDocument.toString(), variables, next)
