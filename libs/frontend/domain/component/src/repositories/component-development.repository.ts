'use server'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const ComponentDevelopmentDocument = graphql(`
  query GetComponentDevelopment {
    actionTypes {
      ...ActionType
    }
    # Need to load all dependent types
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
    }
    # Load system types
    # workaround for lack of ability to recursively fetch field's types
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

export const componentDevelopmentRepository = async () => {
  return await gqlFetch(ComponentDevelopmentDocument, {})
}
