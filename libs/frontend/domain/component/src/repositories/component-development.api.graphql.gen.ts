import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import {
  ActionTypeFragmentDoc,
  AtomDevelopmentFragmentDoc,
  AtomProductionFragmentDoc,
  CodeMirrorTypeFragmentDoc,
  ComponentDevelopmentFragmentDoc,
  PrimitiveTypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RenderPropTypeFragmentDoc,
  RichTextTypeFragmentDoc,
  ResourceFragmentDoc,
} from '@codelab/frontend/infra/gql'

export const GetComponentDevelopmentDocument = graphql(`
  query GetComponentDevelopment {
    actionTypes {
      ...ActionType
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
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
import { type GetComponentDevelopmentQueryVariables } from '@codelab/frontend/infra/gql'

const GetComponentDevelopment = (
  variables: GetComponentDevelopmentQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetComponentDevelopmentDocument, variables, next)

export const getSdk = () => ({ GetComponentDevelopment })
