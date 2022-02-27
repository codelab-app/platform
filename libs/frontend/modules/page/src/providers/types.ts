import { IPage } from '@codelab/shared/abstract/core'

export type PageProviderProps = {
  pageId: string
}

export type UseProvideCurrentPage = {
  currentPage?: IPage
}
