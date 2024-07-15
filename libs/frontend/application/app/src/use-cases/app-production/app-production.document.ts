import { graphql } from '@codelab/frontend/infra/gql'

//  In production we have domain and pageUrlPattern we filter app by domain and page by url
export const AppProductionDocument = graphql(`
  query GetAppProduction($domain: String!, $pageUrlPattern: String!) {
    apps(where: { domains_SOME: { name_IN: [$domain] } }) {
      ...AppProduction
    }
    # Need to load all dependent types
    atoms(where: { type: ReactFragment }) {
      ...AtomProduction
    }
    resources {
      ...Resource
    }
  }
`)
