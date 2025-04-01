import type { SupportedPaginationModel } from '../../services'

export interface ITreeViewProps<T extends SupportedPaginationModel> {
  data: Array<T>
  isLoading: boolean
  showSearchBar: boolean
}
