import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import {
  expectTableColumnCount,
  expectTableColumnHeaders,
  expectTableRowCount,
  expectTableRows,
  expectTableSortedBy,
  filterTableBy,
  getTable,
  getTableBody,
  getTableCell,
  getTableColumnHeader,
  getTableColumnHeaders,
  getTableColumnSorter,
  getTableFiltersDropdownToggle,
  getTableHeader,
  getTableLoadingIndicator,
  getTableRow,
  getTableRows,
  getTableRowSelectionCell,
  getTableRowSelectionHeader,
  getTableScrollContainer,
  searchTableRow,
  sortTableBy,
  toggleBulkRowSelection,
  toggleRowSelection,
  waitForTableToLoad,
} from './table.command'

export interface AntTableCommands {
  expectTableColumnCount: typeof expectTableColumnCount
  expectTableColumnHeaders: typeof expectTableColumnHeaders
  expectTableRowCount: typeof expectTableRowCount
  expectTableRows: typeof expectTableRows
  expectTableSortedBy: typeof expectTableSortedBy
  filterTableBy: typeof filterTableBy
  getTable: typeof getTable
  getTableBody: typeof getTableBody
  getTableCell: typeof getTableCell
  getTableColumnHeader: typeof getTableColumnHeader
  getTableColumnHeaders: typeof getTableColumnHeaders
  getTableColumnSorter: typeof getTableColumnSorter
  getTableFiltersDropdownToggle: typeof getTable
  getTableHeader: typeof getTableHeader
  getTableLoadingIndicator: typeof getTableLoadingIndicator
  getTableRow: typeof getTableRow
  getTableRowSelectionCell: typeof getTableRowSelectionCell
  getTableRowSelectionHeader: typeof getTableRowSelectionHeader
  getTableRows: typeof getTableRows
  getTableScrollContainer: typeof getTableScrollContainer
  // custom
  searchTableRow: typeof searchTableRow
  sortTableBy: typeof sortTableBy
  toggleBulkRowSelection: typeof toggleBulkRowSelection
  toggleRowSelection: typeof toggleRowSelection
  waitForTableToLoad: typeof waitForTableToLoad
}

export const antTableCommands: Array<CypressCommand> = [
  {
    fn: getTable,
  },
  {
    fn: getTableHeader,
  },
  {
    fn: getTableRowSelectionHeader,
  },
  {
    fn: getTableColumnHeaders,
  },
  {
    fn: getTableColumnHeader,
  },
  {
    fn: getTableColumnSorter,
  },
  {
    fn: getTableFiltersDropdownToggle,
  },
  {
    fn: getTableScrollContainer,
  },
  {
    fn: getTableBody,
  },
  {
    fn: getTableRows,
  },
  {
    fn: getTableRow,
  },
  {
    fn: getTableRowSelectionCell,
  },
  {
    fn: getTableCell,
  },
  {
    fn: getTableLoadingIndicator,
  },
  {
    fn: waitForTableToLoad,
  },
  {
    fn: expectTableColumnCount,
  },
  {
    fn: expectTableColumnHeaders,
  },
  {
    fn: expectTableRowCount,
  },
  {
    fn: expectTableRows,
  },
  {
    fn: expectTableSortedBy,
  },
  {
    fn: sortTableBy,
  },
  {
    fn: filterTableBy,
  },
  {
    fn: toggleRowSelection,
  },
  {
    fn: toggleBulkRowSelection,
  },
  {
    fn: searchTableRow,
  },
]
