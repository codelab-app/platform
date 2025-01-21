import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
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
} from '@codelab/shared/infra/gqlgen'

import { type GetAppBuilderQueryVariables } from '@codelab/shared/infra/gqlgen'
import { GetAppBuilderDocument } from './app-builder.api.graphql.docs.gen'

export const GetAppBuilder = (
  variables: GetAppBuilderQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetAppBuilderDocument.toString(), variables, next)
