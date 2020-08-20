import { PropsFromKeys } from '@codelab/props'

export const transferPropKeys = [
  'dataSource',
  'disabled',
  'filterOption',
  'footer',
  'listStyle',
  'locale',
  'operations',
  'oneWay',
  'operationStyle',
  'pagination',
  'render',
  'selectedKeys',
  'showSearch',
  'showSelectAll',
  'targetKeys',
  'titles',
  'selectAllLabels',
  'onChange',
  'onScroll',
  'onSearch',
  'onSelectChange',
] as const

export const renderPropKeys = [
  'direction',
  'disabled',
  'filteredItems',
  'onItemSelect',
  'onItemSelectAll',
  'selectedKeys',
] as const

export type TransferProps = PropsFromKeys<typeof transferPropKeys[number]>

export type RenderProps = PropsFromKeys<typeof renderPropKeys[number]>
