import type { CypressCommand } from '../../types'
import {
  selectNextPage,
  selectPage,
  selectPageSize,
  selectPrevPage,
} from './pagination.command'

export interface AntPaginationCommands {
  selectNextPage: typeof selectNextPage
  selectPage: typeof selectPage
  selectPageSize: typeof selectPageSize
  selectPrevPage: typeof selectPrevPage
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
