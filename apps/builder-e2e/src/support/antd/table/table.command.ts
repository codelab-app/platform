import { absoluteRoot } from '@hon2a/cypress-without'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import isUndefined from 'lodash/isUndefined'
import type { CommonOptions, Label } from '../types'
import { logAndMute } from '../utils'
import type { SearchCellOptions, SortOptions } from './table.types'
import { SORT_ORDER } from './table.types'

const { $ } = Cypress

export const getTable = (options?: CommonOptions) => {
  return cy.get('.ant-table-container', options)
}

export const getTableHeader = (options?: CommonOptions) => {
  return getTable(options).find('.ant-table-thead', options)
}

export const getTableRowSelectionHeader = (options?: CommonOptions) => {
  return getTableHeader(options).find(
    '> tr > th.ant-table-selection-column',
    options,
  )
}

export const getTableColumnHeaders = (options?: CommonOptions) => {
  return getTableHeader(options).find(
    '> tr > th:not(.ant-table-selection-column)',
  )
}

export const getTableColumnHeader = (
  columnIdxOrLabel: number | Label,
  options?: CommonOptions,
) => {
  return isNumber(columnIdxOrLabel)
    ? getTableColumnHeaders(options).eq(columnIdxOrLabel)
    : getTableHeader(options).contains('> tr > th', columnIdxOrLabel, options)
}

export const getTableColumnSorter = (
  columnIdxOrLabel: number | Label,
  {
    sortOrder = SORT_ORDER.ASCENDING,
    ...options
  }: SortOptions & CommonOptions = {},
) => {
  return getTableColumnHeader(columnIdxOrLabel, options).find(
    `.ant-table-column-sorter-${
      sortOrder === SORT_ORDER.DESCENDING ? 'down' : 'up'
    }`,
    options,
  )
}

export const getTableFiltersDropdownToggle = (
  columnIdxOrLabel: number | Label,
  options?: CommonOptions,
) => {
  return getTableColumnHeader(columnIdxOrLabel, options).find(
    '.ant-table-filter-trigger',
    options,
  )
}

export const getTableScrollContainer = (options?: CommonOptions) => {
  return getTable(options).find('.ant-table-body')
}

export const getTableBody = (options?: CommonOptions) => {
  return getTable(options).find('.ant-table-tbody', options)
}

export const getTableRows = (options?: CommonOptions) => {
  return getTableBody(options).find('> tr:not(.ant-table-measure-row)', options)
}

/**
 * Search table by header label & cell value
 *
 * @returns Row
 */
export const searchTableRow = (
  { header, row, table }: SearchCellOptions,
  options?: CommonOptions,
) => {
  /**
   * Get the index of the header column we're searching for
   */
  return (table ?? getTableHeader())
    .contains('.ant-table-cell', header, options)
    .invoke('index')
    .then((columnIndex) => {
      /**
       * Return the matching row
       */
      return getTableBody()
        .contains(`.ant-table-cell:nth-child(${columnIndex + 1})`, row, options)
        .parent('tr.ant-table-row')
    })
}

export const getTableRow = (rowIdx = 0, options?: CommonOptions) => {
  return getTableRows(options).eq(rowIdx, options)
}

export const getTableRowSelectionCell = (
  rowIdx = 0,
  options?: CommonOptions,
) => {
  return getTableRow(rowIdx, options).find(
    'td.ant-table-selection-column',
    options,
  )
}

export const getTableCell = (
  rowIdx = 0,
  colIdx = 0,
  options?: CommonOptions,
) => {
  return getTableRow(rowIdx, options)
    .find('td:not(.ant-table-selection-column)', options)
    .eq(colIdx, options)
}

export const getTableLoadingIndicator = (options?: CommonOptions) => {
  return cy.get('.ant-table-wrapper .ant-spin', options)
}

export const waitForTableToLoad = (options?: CommonOptions) => {
  getTableLoadingIndicator(options).should('not.exist')
}

export const expectTableColumnCount = (
  count: number,
  options?: CommonOptions,
) => {
  const opts = logAndMute('expectTableColumnCount', count.toString(), options)

  return getTableColumnHeaders(opts).should('have.length', count)
}

export const expectTableColumnHeaders = (
  expectedColumnsHeaders: Array<string>,
  options?: CommonOptions,
) => {
  const opts = logAndMute(
    'expectTableColumnHeaders',
    expectedColumnsHeaders.join(', '),
    options,
  )

  getTableColumnHeaders(opts).should((headers) =>
    expectedColumnsHeaders.forEach(
      (expectedHeader, idx) =>
        !isUndefined(expectedHeader) &&
        expect(get(headers[idx], 'textContent')).to.equal(expectedHeader),
    ),
  )
}

export const expectTableRowCount = (count: number, options?: CommonOptions) => {
  const opts = logAndMute('expectTableRowCount', count.toString(), options)
  getTableRows(opts).should('have.length', count)
}

export const expectTableRows = (
  expectedRows: Array<Array<string | undefined>>,
  options?: CommonOptions,
) => {
  const opts = logAndMute(
    'expectTableRows',
    expectedRows
      .map((expectedCellValues) => expectedCellValues.join(', '))
      .join('\n'),
    options,
  )

  getTableRows(opts).should((rows) =>
    expectedRows.forEach((expectedCellValues, rowIdx) =>
      expectedCellValues.forEach(
        (value, cellIdx) =>
          !isUndefined(value) &&
          expect(
            get(
              $(rows[rowIdx]).children(':not(.ant-table-selection-column)')[
                cellIdx
              ],
              'textContent',
            ),
          ).to.equal(value),
      ),
    ),
  )
}

export const expectTableSortedBy = (
  columnIdxOrLabel: number | Label,
  options: SortOptions & CommonOptions = {},
) => {
  const shouldNotBeSorted = isNil(columnIdxOrLabel)

  const opts = logAndMute(
    'expectTableSortedBy',
    shouldNotBeSorted
      ? 'none (unsorted)'
      : `${columnIdxOrLabel}, ${
          options.sortOrder === SORT_ORDER.DESCENDING
            ? 'descending'
            : 'ascending'
        }`,
    options,
  )

  if (shouldNotBeSorted) {
    cy.get('.ant-table-column-sorter.on').should('not.exist')
  } else {
    getTableColumnSorter(columnIdxOrLabel, opts).should('have.class', 'active')
  }
}

/**
 * Direct sort order selection is not supported by `Table`. Clicking on an unsorted column sorts it in ascending order.
 * Clicking on a column sorted in ascending order sorts in descending order. Clicking on descending-sorted column
 * removes the sorting. This const has  = to be used in a similar fashion.
 */
export const sortTableBy = (
  columnIdxOrLabel: number | Label,
  options?: CommonOptions,
) => {
  const opts = logAndMute('sortTableBy', columnIdxOrLabel.toString(), options)
  getTableColumnHeader(columnIdxOrLabel, opts)
    .find('.ant-table-column-sorters', opts)
    .click(opts)
}

export const filterTableBy = (
  columnIdxOrLabel: number | Label,
  values: Array<Label>,
  options?: CommonOptions,
) => {
  const opts = logAndMute(
    'filterTableBy',
    `${columnIdxOrLabel}: ${values.join(', ')}`,
    options,
  )

  getTableFiltersDropdownToggle(columnIdxOrLabel, opts).click()
  absoluteRoot(opts)
    .find('.ant-table-filter-dropdown:visible')
    .within(() => {
      values.forEach((value) =>
        cy.contains('.ant-dropdown-menu-item', value).click(),
      )
      cy.get(`.ant-table-filter-dropdown-btns`)
        .find(values.length ? '.ant-btn-primary' : '.ant-btn-link')
        .click()
    })
  absoluteRoot(opts).find('.ant-table-filter-dropdown').should('not.be.visible')
}

export const toggleRowSelection = (rowIdx: number, options?: CommonOptions) => {
  const opts = logAndMute('toggleRowSelection', rowIdx.toString(), options)
  getTableRowSelectionCell(rowIdx, opts)
    .find('input[type=checkbox]', opts)
    .click(opts)
}

export const toggleBulkRowSelection = (options?: CommonOptions) => {
  const opts = logAndMute('toggleBulkSelection', undefined, options)
  getTableRowSelectionHeader(opts)
    .find('input[type=checkbox]', opts)
    .click(opts)
}
