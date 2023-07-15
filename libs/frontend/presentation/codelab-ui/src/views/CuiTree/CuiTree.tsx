import { Tree } from 'antd'
import type { DirectoryTreeProps, EventDataNode } from 'antd/es/tree'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'
import type { Variant } from '../../abstract'
import { CuiSearchBar, CuiSkeletonWrapper } from '../../components'
import styles from './CuiTree.module.css'
import { CuiTreeItem } from './CuiTreeItem'
import { useFilteredData } from './use-filtered-data'

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
  primaryTitle?: ReactNode | string
  secondaryTitle?: ReactNode | string
  selectable?: boolean
  style?: React.CSSProperties
  switcherIcon?: ReactNode
  tags?: ReactNode
  toolbar?: ReactNode
  varient?: Variant
}

export type WithChildren<T> = T & {
  children?: Array<WithChildren<T>>
}

export interface CuiTreeProps<T extends WithChildren<CuiTreeBasicDataNode>> {
  allowDrop?: DirectoryTreeProps<T>['allowDrop']
  defaultExpandAll?: DirectoryTreeProps<T>['defaultExpandAll']
  disabled?: DirectoryTreeProps<T>['disabled']
  draggable?: boolean
  expandedKeys?: DirectoryTreeProps<T>['expandedKeys']
  isLoading?: boolean
  loadData?: DirectoryTreeProps<T>['loadData']
  multiple?: DirectoryTreeProps<T>['multiple']
  onClick?: DirectoryTreeProps<T>['onClick']
  onDrop?: DirectoryTreeProps<T>['onDrop']
  onExpand?: DirectoryTreeProps<T>['onExpand']
  onMouseEnter?: DirectoryTreeProps<T>['onMouseEnter']
  onMouseLeave?: DirectoryTreeProps<T>['onMouseLeave']
  onSelect?: DirectoryTreeProps<T>['onSelect']
  searchKeyword?: string
  searcheable?: boolean | { primaryTitle?: boolean; secondaryTitle?: boolean }
  selectedKeys?: DirectoryTreeProps<T>['selectedKeys']
  titleRender?: DirectoryTreeProps<T>['titleRender']
  treeData?: Array<T>
  onSearchKeywordChange?(keywork: string): void
}

export const CuiTree = <T extends CuiTreeBasicDataNode = CuiTreeBasicDataNode>(
  props: CuiTreeProps<T>,
) => {
  const {
    draggable,
    expandedKeys,
    isLoading = false,
    onExpand,
    onMouseEnter,
    onMouseLeave,
    onSearchKeywordChange,
    searcheable = false,
    searchKeyword = '',
    titleRender,
    treeData,
  } = props

  const {
    expandedKeys: filterExpandedKeys,
    filteredData,
    setFilterOptions,
  } = useFilteredData(treeData || [])

  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [currentExpandedKeys, setCurrentExpandedKeys] = useState(expandedKeys)

  useEffect(() => {
    setCurrentExpandedKeys(filterExpandedKeys || expandedKeys)
  }, [filterExpandedKeys, expandedKeys])

  const handleExpand = (
    newExpandedKeys: Array<React.Key>,
    info: {
      node: EventDataNode<T>
      expanded: boolean
      nativeEvent: MouseEvent
    },
  ) => {
    onExpand?.(newExpandedKeys, info)
    setCurrentExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  const handleSearchKeywordChange = (keyword: string) => {
    if (searcheable === false) {
      return
    }

    onSearchKeywordChange?.(keyword)
    setAutoExpandParent(true)

    setFilterOptions({
      primaryTitleFilter:
        searcheable === true || searcheable.primaryTitle ? keyword : undefined,
      secondaryTitleFilter:
        searcheable === true || searcheable.secondaryTitle
          ? keyword
          : undefined,
    })
  }

  return (
    <div
      className={classNames(
        styles.cuiTree,
        'h-full overflow-hidden flex flex-col',
      )}
    >
      {searcheable && (
        <CuiSearchBar
          onKeywordChange={handleSearchKeywordChange}
          searchKeyword={searchKeyword}
        />
      )}
      <div className="overflow-auto">
        <CuiSkeletonWrapper isLoading={isLoading}>
          <DirectoryTree<T>
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            autoExpandParent={autoExpandParent}
            draggable={
              draggable
                ? {
                    icon: false,
                  }
                : false
            }
            expandedKeys={currentExpandedKeys}
            onExpand={handleExpand}
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
            treeData={filteredData}
          />
        </CuiSkeletonWrapper>
      </div>
    </div>
  )
}
