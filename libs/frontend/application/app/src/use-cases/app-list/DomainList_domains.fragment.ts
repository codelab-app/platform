import { type FragmentType, graphql } from '@codelab/frontend/infra/gql'

export const DomainList_appFragment = graphql(`
  fragment DomainList_appFragment on App {
    domains {
      id
      ...DomainListItem_domainFragment
    }
  }
`)

export type DomainList_AppFragment = FragmentType<typeof DomainList_appFragment>
