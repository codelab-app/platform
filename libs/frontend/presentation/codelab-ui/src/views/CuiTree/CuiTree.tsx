'use client'

import type { DirectoryTreeProps } from 'antd/es/tree'
import type { ReactNode } from 'react'

import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { Tree } from 'antd'
import Empty from 'antd/lib/empty'
import classNames from 'classnames'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'

import type { Variant } from '../../abstract'

import { CuiSearchBar, CuiSkeletonWrapper } from '../../components'
import styles from './CuiTree.module.css'
import { CuiTreeItem } from './CuiTreeItem'
import { CuiTreeStore } from './store'

const { DirectoryTree } = Tree

export interface CuiTreeBasicDataNode {
  checkable?: boolean
  /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
  className?: string
  disableCheckbox?: boolean
  disabled?: boolean
  highlight?: {
    primaryTitle?: string
    secondaryTitle?: string
  }
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
  variant?: Variant
}

export type WithChildren<T> = T & {
  children?: Array<WithChildren<T>>
}

export interface CuiTreeProps<T extends WithChildren<CuiTreeBasicDataNode>> {
  allowDrop?: DirectoryTreeProps<T>['allowDrop']
  autoExpandParent?: DirectoryTreeProps<T>['autoExpandParent']
  checkStrictly?: DirectoryTreeProps<T>['checkStrictly']
  checkable?: DirectoryTreeProps<T>['checkable']
  checkedKeys?: DirectoryTreeProps<T>['checkedKeys']
  defaultExpandAll?: DirectoryTreeProps<T>['defaultExpandAll']
  disabled?: DirectoryTreeProps<T>['disabled']
  draggable?: boolean
  expandedKeys?: DirectoryTreeProps<T>['expandedKeys']
  isLoading?: boolean
  loadData?: DirectoryTreeProps<T>['loadData']
  multiple?: DirectoryTreeProps<T>['multiple']
  onCheck?: DirectoryTreeProps<T>['onCheck']
  onClick?: DirectoryTreeProps<T>['onClick']
  onDragStart?: DirectoryTreeProps<T>['onDragStart']
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
  onSearchKeywordChange?(keyword: string): void
}

export const CuiTree = observer(
  <T extends CuiTreeBasicDataNode = CuiTreeBasicDataNode>(
    props: CuiTreeProps<T>,
  ) => {
    const {
      autoExpandParent,
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

    const cuiTreeStore = useLocalObservable(
      () =>
        new CuiTreeStore({
          autoExpandParent,
          expandedKeys,
          filterOptions: {},
          treeData,
        }),
    )

    type HandleExpand = Required<CuiTreeProps<WithChildren<T>>>['onExpand']

    const handleExpand = useCallback<HandleExpand>(
      (_expandedKeys, info) => {
        onExpand?.(_expandedKeys, info)
        cuiTreeStore.setExpandedKeys(_expandedKeys)
        cuiTreeStore.setAutoExpandParent(false)
      },
      [cuiTreeStore, onExpand],
    )

    const handleSearchKeywordChange = useCallback(
      (keyword: string) => {
        if (searcheable === false) {
          return
        }

        onSearchKeywordChange?.(keyword)
        cuiTreeStore.setAutoExpandParent(true)
        cuiTreeStore.updateFilterOptions(searcheable, keyword)
      },
      [onSearchKeywordChange, cuiTreeStore, searcheable],
    )

    useEffect(() => {
      cuiTreeStore.setTreeData(treeData ?? [])
      cuiTreeStore.setExpandedKeys(expandedKeys ?? [])
      cuiTreeStore.updateFilterOptions(searcheable, searchKeyword)
    }, [treeData, expandedKeys, searcheable, searchKeyword, cuiTreeStore])

    return (
      <div
        className={classNames(
          styles.cuiTree,
          'h-full overflow-hidden flex flex-col',
        )}
        data-testid={CuiTestId.cuiTree()}
      >
        {searcheable && (
          <CuiSearchBar
            onKeywordChange={handleSearchKeywordChange}
            searchKeyword={searchKeyword}
          />
        )}
        <div className="overflow-auto">
          <CuiSkeletonWrapper isLoading={isLoading}>
            {!isLoading && treeData?.length === 0 ? (
              <Empty style={{ marginTop: '10%' }} />
            ) : (
              <DirectoryTree<T>
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                autoExpandParent={cuiTreeStore.autoExpandParent}
                draggable={
                  draggable
                    ? {
                        icon: false,
                      }
                    : false
                }
                expandAction="doubleClick"
                expandedKeys={cuiTreeStore.expandedKeys}
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
                      highlight={node.highlight}
                      icon={node.icon}
                      primaryTitle={node.primaryTitle}
                      secondaryTitle={node.secondaryTitle}
                      tag={node.tags}
                      toolbar={node.toolbar}
                      variant={node.variant}
                    />
                  )
                }}
                treeData={cuiTreeStore.filteredData}
              />
            )}
          </CuiSkeletonWrapper>
        </div>
      </div>
    )
  },
)

CuiTree.displayName = 'CuiTree'
