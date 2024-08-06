import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import {
  ActionTypeFragmentDoc,
  AtomBuilderFragmentDoc,
  AtomProductionFragmentDoc,
  CodeMirrorTypeFragmentDoc,
  ComponentBuilderFragmentDoc,
  PrimitiveTypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RenderPropTypeFragmentDoc,
  RichTextTypeFragmentDoc,
  ResourceFragmentDoc,
} from '@codelab/frontend/infra/gql'

export const GetComponentBuilderDocument = graphql(`
  query GetComponentBuilder {
    actionTypes {
      ...ActionType
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomBuilder
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

import { type GetComponentBuilderQueryVariables } from '@codelab/frontend/infra/gql'

export const GetComponentBuilder = (
  variables: GetComponentBuilderQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetComponentBuilderDocument.toString(), variables, next)
