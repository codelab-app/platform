import compact from 'lodash/compact'
import { action, computed, makeObservable, observable } from 'mobx'
import type { Key } from 'react'
import React from 'react'
import { traverseAndFlattenTrees, traverseTrees } from '../../../util'
import type { CuiTreeBasicDataNode, WithChildren } from '../CuiTree'

interface FilterOptions {
  primaryTitleFilter?: string | undefined
  secondaryTitleFilter?: string | undefined
}

interface ICuiTreeStoreDefaults<T extends CuiTreeBasicDataNode> {
  autoExpandParent?: boolean
  expandedKeys?: Array<Key>
  filterOptions: FilterOptions | undefined
  treeData?: Array<WithChildren<T>>
}

/**
 * Finds the key of the parent of the current element
 * @param key the key of the current element
 * @param tree the original tree
 * @returns
 */
const getParentKey = (
  key: React.Key,
  tree: Array<WithChildren<CuiTreeBasicDataNode>>,
): React.Key | undefined => {
  let parentKey: React.Key | undefined

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]

    if (node && node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }

  return parentKey
}

export class CuiTreeStore<T extends CuiTreeBasicDataNode> {
  get autoExpandParent() {
    return this.autoExpandParent_
  }

  @computed
  get expandedKeys() {
    if (
      !this.useFilterExpandedKeys_ ||
      (!this.filterOptions_?.primaryTitleFilter &&
        !this.filterOptions_?.secondaryTitleFilter)
    ) {
      return this.expandedKeys_
    }

    const primaryFilter =
      this.filterOptions_.primaryTitleFilter &&
      new RegExp(this.filterOptions_.primaryTitleFilter, 'i')

    const secondaryFilter =
      this.filterOptions_.secondaryTitleFilter &&
      new RegExp(this.filterOptions_.secondaryTitleFilter, 'i')

    return compact(
      traverseAndFlattenTrees<T, React.Key | undefined>(
        this.treeData_,
        (item) => {
          const primaryTitle = item.primaryTitle
          const secondaryTitle = item.secondaryTitle

          const shouldExpand =
            (typeof primaryTitle === 'string' &&
              primaryFilter &&
              primaryFilter.test(primaryTitle)) ||
            (typeof secondaryTitle === 'string' &&
              secondaryFilter &&
              secondaryFilter.test(secondaryTitle))

          return shouldExpand
            ? getParentKey(item.key, this.treeData_)
            : undefined
        },
      ),
    )
  }

  get filterOptions() {
    return this.filterOptions_
  }

  @computed
  get filteredData() {
    const primaryFilter = this.filterOptions_?.primaryTitleFilter
    const secondaryFilter = this.filterOptions_?.secondaryTitleFilter

    return traverseTrees(this.treeData_, (item) => ({
      ...item,
      highlight: {
        primaryTitle: primaryFilter,
        secondaryTitle: secondaryFilter,
      },
    }))
  }

  get treeData() {
    return this.treeData_
  }

  constructor({
    autoExpandParent = true,
    expandedKeys = [],
    filterOptions,
    treeData = [],
  }: ICuiTreeStoreDefaults<T>) {
    makeObservable(this)
    this.expandedKeys_ = expandedKeys
    this.filterOptions_ = filterOptions
    this.treeData_ = treeData
    this.autoExpandParent_ = autoExpandParent
  }

  @action
  setAutoExpandParent(autoExpandParent: boolean) {
    this.autoExpandParent_ = autoExpandParent
  }

  @action
  setExpandedKeys(newExpandedKeys: Array<Key>) {
    this.expandedKeys_ = newExpandedKeys
    this.useFilterExpandedKeys_ = false
  }

  @action
  setTreeData(treeData: Array<WithChildren<T>>) {
    this.treeData_ = treeData
  }

  @action
  updateFilterOptions(
    searcheable: boolean | { primaryTitle?: boolean; secondaryTitle?: boolean },
    searchKeyword: string,
  ) {
    this.filterOptions_ = {
      primaryTitleFilter:
        searcheable === true ||
        (searcheable !== false && searcheable.primaryTitle)
          ? searchKeyword
          : undefined,
      secondaryTitleFilter:
        searcheable === true ||
        (searcheable !== false && searcheable.secondaryTitle)
          ? searchKeyword
          : undefined,
    }
    this.useFilterExpandedKeys_ = true
  }

  @observable
  private autoExpandParent_ = true

  @observable
  private expandedKeys_: Array<Key>

  @observable
  private filterOptions_: FilterOptions | undefined

  @observable
  private treeData_: Array<WithChildren<T>>

  @observable
  private useFilterExpandedKeys_ = false
}
