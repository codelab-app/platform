import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type ComponentFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null | undefined }
}

export const ComponentFragmentDoc = gql`
  fragment Component on Component {
    id
    name
    rootElement {
      id
      name
    }
  }
`
