import type { CypressCommand } from '../../types'
import {
  selectNextPage,
  selectPage,
  selectPageSize,
  selectPrevPage,
} from './pagination.command'

export interface AntPaginationCommands {
  selectPageSize: typeof selectPageSize
  selectPage: typeof selectPage
  selectPrevPage: typeof selectPrevPage
  selectNextPage: typeof selectNextPage
}

export const antPaginationCommands: Array<CypressCommand> = [
  {
    fn: selectPageSize,
    name: 'selectPageSize',
  },
  {
    fn: selectPage,
    name: 'selectPage',
  },
  {
    fn: selectPrevPage,
    name: 'selectPrevPage',
  },
  {
    fn: selectNextPage,
    name: 'selectNextPage',
  },
]
