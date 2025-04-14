import type { Key } from 'react'

import { action, computed, makeObservable, observable } from 'mobx'
import { isTruthy, filter as rFilter } from 'remeda'

import { traverseAndFlattenTrees, traverseTrees } from '../../../util'
import { CuiTreeBasicDataNode, WithChildren } from '../cui-tree.type'

export interface FilterOptions {
  // Set a filter false if you don't want a filter.
  filterable: {
    primaryTitle?: boolean
    secondaryTitle?: boolean
  }
  keyword: string
}

interface ICuiTreeStoreDefaults<T extends CuiTreeBasicDataNode> {
  autoExpandParent?: boolean
  expandedKeys?: Array<Key>
  filter?: FilterOptions
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
      } else {
        // Store the result of the recursive call so we only call it once
        const foundKey = getParentKey(key, node.children)

        if (foundKey) {
          parentKey = foundKey
        }
      }
    }
  }

  return parentKey
}

export class CuiTreeStore<T extends CuiTreeBasicDataNode> {
  @computed
  get autoExpandParent() {
    return this._autoExpandParent
  }

  @computed
  get expandedKeys() {
    if (
      !this._useFilterExpandedKeys ||
      (!this._filter?.filterable.primaryTitle &&
        !this._filter?.filterable.secondaryTitle) ||
      !this._filter.keyword
    ) {
      return this._expandedKeys
    }

    const primaryFilter =
      this._filter.filterable.primaryTitle &&
      new RegExp(this._filter.keyword, 'i')

    const secondaryFilter =
      this._filter.filterable.secondaryTitle &&
      new RegExp(this._filter.keyword, 'i')

    const filterExpandedKeys = rFilter(
      traverseAndFlattenTrees<T, React.Key | undefined>(
        this._treeData,
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

          const parentKey = shouldExpand
            ? getParentKey(item.key, this._treeData)
            : undefined

          return parentKey
        },
      ),
      isTruthy,
    )

    return filterExpandedKeys
  }

  @computed
  get filteredData() {
    const primaryFilter =
      this._filter?.filterable.primaryTitle && this._filter.keyword

    const secondaryFilter =
      this._filter?.filterable.secondaryTitle && this._filter.keyword

    return traverseTrees(this._treeData, (item) => ({
      ...item,
      highlight: {
        primaryTitle: primaryFilter,
        secondaryTitle: secondaryFilter,
      },
    }))
  }

  get treeData() {
    return this._treeData
  }

  constructor({
    autoExpandParent = true,
    expandedKeys = [],
    filter,
    treeData = [],
  }: ICuiTreeStoreDefaults<T>) {
    makeObservable(this)

    this._expandedKeys = expandedKeys
    this._searchKeyword = ''
    this._treeData = treeData
    this._filter = filter
    this._autoExpandParent = autoExpandParent
  }

  @action
  setAutoExpandParent(autoExpandParent: boolean) {
    this._autoExpandParent = autoExpandParent
  }

  @action
  setExpandedKeys(newExpandedKeys: Array<Key>) {
    this._expandedKeys = newExpandedKeys
    this._useFilterExpandedKeys = false
  }

  @action
  setTreeData(treeData: Array<WithChildren<T>>) {
    this._treeData = treeData
  }

  @action
  updateFilterOptions(options?: FilterOptions) {
    if (!options) {
      return
    }

    this._filter = options
    this._useFilterExpandedKeys = true
  }

  @observable
  private _autoExpandParent = true

  @observable
  private _expandedKeys: Array<Key>

  @observable
  private _filter?: FilterOptions

  @observable
  private _searchKeyword = ''

  @observable
  private _treeData: Array<WithChildren<T>>

  @observable
  private _useFilterExpandedKeys = false
}
