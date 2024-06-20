import { type FragmentType, graphql } from '@codelab/frontend/infra/gql'

export const AppList_query = graphql(`
  query AppList_query($options: AppOptions, $where: AppWhere) {
    ...AppList_queryFragment
    # atoms(where: { type: ReactFragment }) {
    #   ...AtomDevelopment
    # }
  }
`)

export type AppList_Query = FragmentType<typeof AppList_query>
