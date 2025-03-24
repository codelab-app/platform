import type {
  IPaginationSearchParams,
  SupportedPaginationModel,
} from '../../services'

export interface ITreeViewProps<T extends SupportedPaginationModel> {
  data: Array<T>
  isLoading: boolean
  searchParams: IPaginationSearchParams
  showSearchBar: boolean
}
