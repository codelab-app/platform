import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
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

export const GetAppBuilderDocument = graphql(`
  query GetAppBuilder($appId: ID!, $pageIds: [ID!]) {
    actionTypes {
      ...ActionType
    }
    apps(where: { id: $appId }) {
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
    redirects(where: { source: { app: { id: $appId } } }) {
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
