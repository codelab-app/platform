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
    name: 'selectPageSize',
    fn: selectPageSize,
  },
  {
    name: 'selectPage',
    fn: selectPage,
  },
  {
    name: 'selectPrevPage',
    fn: selectPrevPage,
  },
  {
    name: 'selectNextPage',
    fn: selectNextPage,
  },
]
