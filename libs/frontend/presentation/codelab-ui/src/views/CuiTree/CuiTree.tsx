import { Tree } from 'antd'
import type { DirectoryTreeProps, EventDataNode } from 'antd/es/tree'
import classNames from 'classnames'
import { observer, useLocalObservable } from 'mobx-react-lite'
import type { ReactNode } from 'react'
import React, { useEffect } from 'react'
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

export const CuiTree = observer(
  <T extends CuiTreeBasicDataNode = CuiTreeBasicDataNode>(
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

    const cuiTreeStore = useLocalObservable(
      () =>
        new CuiTreeStore({
          expandedKeys: expandedKeys ?? [],
          filterOptions: {},
          treeData: treeData ?? [],
        }),
    )

    useEffect(() => {
      treeData && cuiTreeStore.setTreeData(treeData)

      expandedKeys && cuiTreeStore.setExpandedKeys(expandedKeys)

      cuiTreeStore.updateFilterOptions(searcheable, searchKeyword)
    }, [expandedKeys, treeData, searcheable, searchKeyword, cuiTreeStore])

    const handleExpand = (
      newExpandedKeys: Array<React.Key>,
      info: {
        node: EventDataNode<T>
        expanded: boolean
        nativeEvent: MouseEvent
      },
    ) => {
      onExpand?.(newExpandedKeys, info)
      cuiTreeStore.setExpandedKeys(newExpandedKeys)
      cuiTreeStore.setAutoExpandParent(false)
    }

    const handleSearchKeywordChange = (keyword: string) => {
      if (searcheable === false) {
        return
      }

      onSearchKeywordChange?.(keyword)
      cuiTreeStore.setAutoExpandParent(true)
      cuiTreeStore.updateFilterOptions(searcheable, keyword)
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
              autoExpandParent={cuiTreeStore.autoExpandParent}
              draggable={
                draggable
                  ? {
                      icon: false,
                    }
                  : false
              }
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
                    variant={node.varient}
                  />
                )
              }}
              treeData={cuiTreeStore.filteredData}
            />
          </CuiSkeletonWrapper>
        </div>
      </div>
    )
  },
)
