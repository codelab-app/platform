import { PageBaseFragment } from '../graphql/PageBase.fragment.graphql.gen'

export type PageProviderProps = {
  pageId: string
}

export type UseProvideCurrentPage = {
  currentPage?: PageBaseFragment
}
