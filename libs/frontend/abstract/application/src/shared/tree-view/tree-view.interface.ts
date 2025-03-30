import type {
  PaginationClientProps,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'

import type { SupportedPaginationModel } from '../../services'

export interface ITreeViewProps<T extends SupportedPaginationModel> {
  data: Array<T>
  isLoading: boolean
  searchParams: PaginationClientProps & TreeViewClientProps
  showSearchBar: boolean
}
