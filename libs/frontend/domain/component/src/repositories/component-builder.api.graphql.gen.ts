import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from '@codelab/shared/infra/gql'

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

import { type GetComponentBuilderQueryVariables } from '@codelab/shared/infra/gql'

export const GetComponentBuilder = (
  variables: GetComponentBuilderQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetComponentBuilderDocument.toString(), variables, next)
