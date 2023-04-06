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
