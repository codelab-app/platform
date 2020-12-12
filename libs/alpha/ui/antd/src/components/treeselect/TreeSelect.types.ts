import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace TreeSelect {
  export const propKeys = [
    'allowClear',
    'autoClearSearchValue',
    'bordered',
    'defaultValue',
    'disabled',
    'dropdownClassName',
    'dropdownMatchSelectWidth',
    'dropdownRender',
    'dropdownStyle',
    'filterTreeNode',
    'getPopupContainer',
    'labelInValue',
    'listHeight',
    'loadData',
    'maxTagCount',
    'maxTagPlaceholder',
    'multiple',
    'placeholder',
    'searchValue',
    'treeIcon',
    'switcherIcon',
    'showCheckedStrategy',
    'showSearch',
    'size',
    'showArrow',
    'suffixIcon',
    'treeCheckable',
    'treeCheckStrictly',
    'treeData',
    'treeDataSimpleMode',
    'treeDefaultExpandAll',
    'treeDefaultExpandedKeys',
    'treeExpandedKeys',
    'treeNodeFilterProp',
    'treeNodeLabelProp',
    'value',
    'virtual',
    'onChange',
    'onSearch',
    'onSelect',
    'onTreeExpand',
  ] as const

  export const treeNodePropKeys = [
    'selectable',
    'checkable',
    'disableCheckbox',
    'disabled',
    'isLeaf',
    'key',
    'title',
    'value',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type TreeNodeProps = PropsFromKeys<typeof treeNodePropKeys[number]>
}
