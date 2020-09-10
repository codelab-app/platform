import { PropsFromKeys } from '@codelab/shared/interface/props'

export const treePropKeys = [
  'autoExpandParent',
  'blockNode',
  'checkable',
  'checkedKeys',
  'checkStrictly',
  'defaultCheckedKeys',
  'defaultExpandAll',
  'defaultExpandedKeys',
  'defaultExpandParent',
  'defaultSelectedKeys',
  'disabled',
  'draggable',
  'expandedKeys',
  'filterTreeNode',
  'loadData',
  'loadedKeys',
  'multiple',
  'selectable',
  'selectedKeys',
  'showIcon',
  'switcherIcon',
  'showLine',
  'titleRender',
  'treeData',
  'virtual',
  'onCheck',
  'onDragEnd',
  'onDragEnter',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onExpand',
  'onLoad',
  'onRightClick',
  'onSelect',
  'icon',
] as const

export const treeNodePropKeys = [
  'selectable',
  'checkable',
  'disableCheckbox',
  'disabled',
  'isLeaf',
  'key',
  'title',
  'icon',
] as const

export type TreeProps = PropsFromKeys<typeof treePropKeys[number]>

export type TreeNodeProps = PropsFromKeys<typeof treeNodePropKeys[number]>
