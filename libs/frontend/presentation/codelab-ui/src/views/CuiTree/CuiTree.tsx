'use client'

import type { DirectoryTreeProps } from 'antd/es/tree'
import type { ReactNode } from 'react'

import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { Tree } from 'antd'
import Empty from 'antd/lib/empty'
import classNames from 'classnames'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'

import type { Variant } from '../../abstract'
import type {
  CuiTreeBasicDataNode,
  CuiTreeProps,
  WithChildren,
} from './cui-tree.type'
import type { FilterOptions } from './store'

import { CuiSearchBar, CuiSkeletonWrapper } from '../../components'
import styles from './CuiTree.module.css'
import { CuiTreeItem } from './CuiTreeItem'
import { CuiTreeStore } from './store'

const { DirectoryTree } = Tree

export const CuiTree = observer(
  <T extends CuiTreeBasicDataNode = CuiTreeBasicDataNode>(
    props: CuiTreeProps<T>,
  ) => {
    const {
      autoExpandParent,
      defaultSelectedKeys,
      draggable,
      expandedKeys,
      filter,
      isLoading = false,
      onExpand,
      onMouseEnter,
      onMouseLeave,
      onSearchKeywordChange,
      onSelect,
      titleRender,
      treeData,
    } = props

    const cuiTreeStore = useLocalObservable(
      () =>
        new CuiTreeStore({
          autoExpandParent,
          expandedKeys,
          filter,
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
        onSearchKeywordChange?.(keyword)
        cuiTreeStore.setAutoExpandParent(true)

        // Create an updated filter with the new keyword
        if (filter) {
          const updatedFilter: FilterOptions = {
            ...filter,
            keyword: keyword,
          }

          cuiTreeStore.updateFilterOptions(updatedFilter)
        }
      },
      [onSearchKeywordChange, cuiTreeStore, filter],
    )

    useEffect(() => {
      console.log('expandedNodes', expandedKeys)
      cuiTreeStore.setTreeData(treeData ?? [])
      // cuiTreeStore.setExpandedKeys(expandedKeys ?? cuiTreeStore.expandedKeys)
      cuiTreeStore.updateFilterOptions(filter)
    }, [treeData, expandedKeys, filter, cuiTreeStore])

    return (
      <div
        className={classNames(
          styles.cuiTree,
          'h-full overflow-hidden flex flex-col',
        )}
        data-testid={CuiTestId.cuiTree()}
      >
        {filter && (
          <CuiSearchBar
            onKeywordChange={handleSearchKeywordChange}
            searchKeyword={filter.keyword}
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
                defaultSelectedKeys={defaultSelectedKeys}
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
                      selectedKey={node.key}
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
