import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
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
  },
  {
    fn: selectPage,
  },
  {
    fn: selectPrevPage,
  },
  {
    fn: selectNextPage,
  },
]
