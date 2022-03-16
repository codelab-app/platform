import { PageFragment } from '../graphql/Page.fragment.v2.graphql.gen'

export type PageProviderProps = {
  pageId: string
}

export type UseProvideCurrentPage = {
  currentPage?: PageFragment
}
