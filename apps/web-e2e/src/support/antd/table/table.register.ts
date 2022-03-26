import { CypressCommand } from '../../types'
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
    name: 'getTable',
    fn: getTable,
  },
  {
    name: 'getTableHeader',
    fn: getTableHeader,
  },
  {
    name: 'getTableRowSelectionHeader',
    fn: getTableRowSelectionHeader,
  },
  {
    name: 'getTableColumnHeaders',
    fn: getTableColumnHeaders,
  },
  {
    name: 'getTableColumnHeader',
    fn: getTableColumnHeader,
  },
  {
    name: 'getTableColumnSorter',
    fn: getTableColumnSorter,
  },
  {
    name: 'getTableFiltersDropdownToggle',
    fn: getTableFiltersDropdownToggle,
  },
  {
    name: 'getTableScrollContainer',
    fn: getTableScrollContainer,
  },
  {
    name: 'getTableBody',
    fn: getTableBody,
  },
  {
    name: 'getTableRows',
    fn: getTableRows,
  },
  {
    name: 'getTableRow',
    fn: getTableRow,
  },
  {
    name: 'getTableRowSelectionCell',
    fn: getTableRowSelectionCell,
  },
  {
    name: 'getTableCell',
    fn: getTableCell,
  },
  {
    name: 'getTableLoadingIndicator',
    fn: getTableLoadingIndicator,
  },
  {
    name: 'waitForTableToLoad',
    fn: waitForTableToLoad,
  },
  {
    name: 'expectTableColumnCount',
    fn: expectTableColumnCount,
  },
  {
    name: 'expectTableColumnHeaders',
    fn: expectTableColumnHeaders,
  },
  {
    name: 'expectTableRowCount',
    fn: expectTableRowCount,
  },
  {
    name: 'expectTableRows',
    fn: expectTableRows,
  },
  {
    name: 'expectTableSortedBy',
    fn: expectTableSortedBy,
  },
  {
    name: 'sortTableBy',
    fn: sortTableBy,
  },
  {
    name: 'filterTableBy',
    fn: filterTableBy,
  },
  {
    name: 'toggleRowSelection',
    fn: toggleRowSelection,
  },
  {
    name: 'toggleBulkRowSelection',
    fn: toggleBulkRowSelection,
  },
  {
    name: 'searchTableRow',
    fn: searchTableRow,
  },
]
