import { Tree } from 'antd'
import type { DirectoryTreeProps } from 'antd/es/tree'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import React from 'react'
import type { Variant } from '../../abstract'
import styles from './CuiTree.module.css'
import { CuiTreeItem } from './CuiTreeItem'

const { DirectoryTree } = Tree

export interface CuiTreeBasicDataNode {
  checkable?: boolean
  /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
  className?: string
  disableCheckbox?: boolean
  disabled?: boolean
  icon?: ReactNode
  isLeaf?: boolean
  key: number | string
  primaryTitle?: string
  secondaryTitle?: string
  selectable?: boolean
  style?: React.CSSProperties
  switcherIcon?: ReactNode
  tags?: ReactNode
  toolbar?: ReactNode
  varient?: Variant
}

export interface CuiTreeProps<T extends CuiTreeBasicDataNode> {
  defaultExpandAll?: DirectoryTreeProps<T>['defaultExpandAll']
  disabled?: DirectoryTreeProps<T>['disabled']
  draggable?: boolean
  expandedKeys?: DirectoryTreeProps<T>['expandedKeys']
  loadData?: DirectoryTreeProps<T>['loadData']
  multiple?: DirectoryTreeProps<T>['multiple']
  onClick?: DirectoryTreeProps<T>['onClick']
  onDrop?: DirectoryTreeProps<T>['onDrop']
  onExpand?: DirectoryTreeProps<T>['onExpand']
  onMouseEnter?: DirectoryTreeProps<T>['onMouseEnter']
  onMouseLeave?: DirectoryTreeProps<T>['onMouseLeave']
  onSelect?: DirectoryTreeProps<T>['onSelect']
  selectedKeys?: DirectoryTreeProps<T>['selectedKeys']
  titleRender?: DirectoryTreeProps<T>['titleRender']
  treeData?: Array<T>
}

export const CuiTree = <T extends CuiTreeBasicDataNode = CuiTreeBasicDataNode>(
  props: CuiTreeProps<T>,
) => {
  const { draggable, onMouseEnter, onMouseLeave, titleRender, treeData } = props

  return (
    <div className={classNames(styles.cuiTree, 'h-full')}>
      <DirectoryTree<T>
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        draggable={
          draggable
            ? {
                icon: false,
              }
            : false
        }
        onMouseEnter={(info) => {
          const target = info.event.target as Element
          const treeNodeWrapper = target.closest('.ant-tree-treenode')
          treeNodeWrapper?.classList.add('ant-tree-treenode-hovered')

          return onMouseEnter?.(info)
        }}
        onMouseLeave={(info) => {
          const target = info.event.target as Element
          const treeNodeWrapper = target.closest('.ant-tree-treenode')
          treeNodeWrapper?.classList.remove('ant-tree-treenode-hovered')

          return onMouseLeave?.(info)
        }}
        showIcon={false}
        showLine
        titleRender={(node) => {
          return titleRender ? (
            titleRender(node)
          ) : (
            <CuiTreeItem
              icon={node.icon}
              primaryTitle={node.primaryTitle}
              secondaryTitle={node.secondaryTitle}
              tag={node.tags}
              toolbar={node.toolbar}
              variant={node.varient}
            />
          )
        }}
        treeData={treeData}
      />
    </div>
  )
}
