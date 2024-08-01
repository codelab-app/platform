import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
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
} from '@codelab/frontend/infra/gql'

export const GetAppBuilderDocument = graphql(`
  query GetAppBuilder($appCompositeKey: String!, $pageName: String!) {
    actionTypes {
      ...ActionType
    }
    apps(where: { compositeKey: $appCompositeKey }) {
      ...AppBuilder
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomBuilder
    }
    authGuards {
      ...AuthGuard
    }
    codeMirrorTypes {
      ...CodeMirrorType
    }
    components {
      ...ComponentBuilder
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
import { type GetAppBuilderQueryVariables } from '@codelab/frontend/infra/gql'

const GetAppBuilder = (
  variables: GetAppBuilderQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAppBuilderDocument, variables, next)

export const getSdk = () => ({ GetAppBuilder })
