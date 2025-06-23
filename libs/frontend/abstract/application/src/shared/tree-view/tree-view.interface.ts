import type { SearchParamsClientProps } from '@codelab/frontend-abstract-types'

import type { SupportedPaginationModel } from '../../services'

export interface ITreeViewProps<T extends SupportedPaginationModel> {
  data: Array<T>
  isLoading: boolean
  searchParams: SearchParamsClientProps
  showSearchBar: boolean
  handlePaginationChange?(page: number, pageSize: number, search: string): void
}
