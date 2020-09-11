import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Transfer {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type RenderProps = PropsFromKeys<typeof renderPropKeys[number]>
}
