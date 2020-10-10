import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Table {
  export const propKeys = [
    'tableLayout',
    'bordered',
    'columns',
    'components',
    'dataSource',
    'expandable',
    'footer',
    'loading',
    'locale',
    'pagination',
    'rowClassName',
    'rowKey',
    'rowSelection',
    'scroll',
    'showHeader',
    'size',
    'summary',
    'title',
    'onChange',
    'onHeaderRow',
    'onRow',
    'getPopupContainer',
    'sortDirections',
    'showSorterTooltip',
    'sticky',
  ] as const

  export const columnPropKeys = [
    'align',
    'ellipsis',
    'className',
    'colSpan',
    'dataIndex',
    'defaultFilteredValue',
    'defaultSortOrder',
    'filterDropdown',
    'filterDropdownVisible',
    'filtered',
    'filteredValue',
    'filterIcon',
    'filterMultiple',
    'filters',
    'fixed',
    'key',
    'render',
    'responsive',
    'shouldCellUpdate',
    'sorter',
    'sortOrder',
    'sortDirections',
    'title',
    'width',
    'onCell',
    'onFilter',
    'onFilterDropdownVisibleChange',
    'onHeaderCell',
    'showSorterTooltip',
  ] as const

  export const columnGroupPropKeys = ['title'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ColumnProps = PropsFromKeys<typeof columnPropKeys[number]>

  export type ColumnGroupProps = PropsFromKeys<
    typeof columnGroupPropKeys[number]
  >
}
