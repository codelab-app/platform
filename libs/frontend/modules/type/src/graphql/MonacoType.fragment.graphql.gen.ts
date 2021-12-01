import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type MonacoTypeFragment = {
  id: string
  name: string
  language: Types.MonacoLanguage
}

export const MonacoTypeFragmentDoc = gql`
  fragment MonacoType on MonacoType {
    id
    name
    language
  }
`
