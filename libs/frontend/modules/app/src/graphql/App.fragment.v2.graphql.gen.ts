import * as Types from '@codelab/shared/abstract/codegen-v2'

import { PageFragment } from '../../../page/src/graphql/Page.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { PageFragmentDoc } from '../../../page/src/graphql/Page.fragment.v2.graphql.gen'
export type AppFragment = {
  id: string
  name: string
  pages?: Array<PageFragment> | null | undefined
}

export type AppBaseFragment = {
  id: string
  name: string
  pages?: Array<{ id: string; name: string }> | null | undefined
}

export type AppBaseFragment = { id: string; name: string }

export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    pages {
      id
      name
    }
  }
  ${PageFragmentDoc}
`
export const AppBaseFragmentDoc = gql`
  fragment AppBase on App {
    id
    name
  }
`
