import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import {
  ActionTypeFragmentDoc,
  AppDevelopmentFragmentDoc,
  CodeMirrorTypeFragmentDoc,
  PrimitiveTypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RenderPropTypeFragmentDoc,
  RichTextTypeFragmentDoc,
  AtomDevelopmentFragmentDoc,
  AtomProductionFragmentDoc,
  ResourceFragmentDoc,
  AuthGuardFragmentDoc,
  ComponentDevelopmentFragmentDoc,
  RedirectFragmentDoc,
} from '@codelab/frontend/infra/gql'

export const GetAppDevelopmentDocument = graphql(`
  query GetAppDevelopment($appCompositeKey: String!, $pageName: String!) {
    actionTypes {
      ...ActionType
    }
    apps(where: { compositeKey: $appCompositeKey }) {
      ...AppDevelopment
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
    }
    authGuards {
      ...AuthGuard
    }
    codeMirrorTypes {
      ...CodeMirrorType
    }
    components {
      ...ComponentDevelopment
    }
    primitiveTypes {
      ...PrimitiveType
    }
    reactNodeTypes {
      ...ReactNodeType
    }
    redirects(where: { source: { app: { compositeKey: $appCompositeKey } } }) {
      ...Redirect
    }
    renderPropTypes {
      ...RenderPropType
    }
    resources {
      ...Resource
    }
    richTextTypes {
      ...RichTextType
    }
  }
`)
import { type GetAppDevelopmentQueryVariables } from '@codelab/frontend/infra/gql'

const GetAppDevelopment = (
  variables: GetAppDevelopmentQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAppDevelopmentDocument, variables, next)

export const getSdk = () => ({ GetAppDevelopment })
