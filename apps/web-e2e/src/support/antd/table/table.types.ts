import { Label } from '../types'

type SortOrder = 'asc' | 'desc'

export const SORT_ORDER = {
  ASCENDING: 'asc' as SortOrder,
  DESCENDING: 'desc' as SortOrder,
}

export type SortOptions = { sortOrder?: SortOrder }

export type SearchCellOptions = {
  // The header to search under
  header: Label

  // The value to search within the row
  row: Label
}
