import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from 'graphql-request'
export type PageFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null }
}

export type PageBaseFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null }
}

export type PageFullFragment = {
  ' $fragmentRefs': { PageBaseFragment: PageBaseFragment }
}

export const PageFragmentDoc = gql`
  fragment Page on Page {
    id
    name
    rootElement {
      id
      name
    }
  }
`
export const PageBaseFragmentDoc = gql`
  fragment PageBase on Page {
    id
    name
    rootElement {
      id
      name
    }
  }
`
export const PageFullFragmentDoc = gql`
  fragment PageFull on Page {
    ...PageBase
  }
  ${PageBaseFragmentDoc}
`
