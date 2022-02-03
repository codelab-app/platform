import { PageFragment } from '../graphql'

export type PageProviderProps = {
  pageId: string
}

export type UseProvideCurrentPage = {
  currentPage?: PageFragment
}
