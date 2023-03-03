import type { CypressCommand } from '../../types'
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
  getTable: typeof getTable
  getTableHeader: typeof getTableHeader
  getTableRowSelectionHeader: typeof getTableRowSelectionHeader
  getTableColumnHeaders: typeof getTableColumnHeaders
  getTableColumnHeader: typeof getTableColumnHeader
  getTableColumnSorter: typeof getTableColumnSorter
  getTableFiltersDropdownToggle: typeof getTable
  getTableScrollContainer: typeof getTableScrollContainer
  getTableBody: typeof getTableBody
  getTableRows: typeof getTableRows
  getTableRow: typeof getTableRow
  getTableRowSelectionCell: typeof getTableRowSelectionCell
  getTableCell: typeof getTableCell
  getTableLoadingIndicator: typeof getTableLoadingIndicator
  waitForTableToLoad: typeof waitForTableToLoad
  expectTableColumnCount: typeof expectTableColumnCount
  expectTableColumnHeaders: typeof expectTableColumnHeaders
  expectTableRowCount: typeof expectTableRowCount
  expectTableRows: typeof expectTableRows
  expectTableSortedBy: typeof expectTableSortedBy
  sortTableBy: typeof sortTableBy
  filterTableBy: typeof filterTableBy
  toggleRowSelection: typeof toggleRowSelection
  toggleBulkRowSelection: typeof toggleBulkRowSelection

  // custom
  searchTableRow: typeof searchTableRow
}

export const antTableCommands: Array<CypressCommand> = [
  {
    fn: getTable,
    name: 'getTable',
  },
  {
    fn: getTableHeader,
    name: 'getTableHeader',
  },
  {
    fn: getTableRowSelectionHeader,
    name: 'getTableRowSelectionHeader',
  },
  {
    fn: getTableColumnHeaders,
    name: 'getTableColumnHeaders',
  },
  {
    fn: getTableColumnHeader,
    name: 'getTableColumnHeader',
  },
  {
    fn: getTableColumnSorter,
    name: 'getTableColumnSorter',
  },
  {
    fn: getTableFiltersDropdownToggle,
    name: 'getTableFiltersDropdownToggle',
  },
  {
    fn: getTableScrollContainer,
    name: 'getTableScrollContainer',
  },
  {
    fn: getTableBody,
    name: 'getTableBody',
  },
  {
    fn: getTableRows,
    name: 'getTableRows',
  },
  {
    fn: getTableRow,
    name: 'getTableRow',
  },
  {
    fn: getTableRowSelectionCell,
    name: 'getTableRowSelectionCell',
  },
  {
    fn: getTableCell,
    name: 'getTableCell',
  },
  {
    fn: getTableLoadingIndicator,
    name: 'getTableLoadingIndicator',
  },
  {
    fn: waitForTableToLoad,
    name: 'waitForTableToLoad',
  },
  {
    fn: expectTableColumnCount,
    name: 'expectTableColumnCount',
  },
  {
    fn: expectTableColumnHeaders,
    name: 'expectTableColumnHeaders',
  },
  {
    fn: expectTableRowCount,
    name: 'expectTableRowCount',
  },
  {
    fn: expectTableRows,
    name: 'expectTableRows',
  },
  {
    fn: expectTableSortedBy,
    name: 'expectTableSortedBy',
  },
  {
    fn: sortTableBy,
    name: 'sortTableBy',
  },
  {
    fn: filterTableBy,
    name: 'filterTableBy',
  },
  {
    fn: toggleRowSelection,
    name: 'toggleRowSelection',
  },
  {
    fn: toggleBulkRowSelection,
    name: 'toggleBulkRowSelection',
  },
  {
    fn: searchTableRow,
    name: 'searchTableRow',
  },
]
