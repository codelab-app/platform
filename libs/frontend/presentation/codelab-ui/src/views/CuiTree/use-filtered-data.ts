import compact from 'lodash/compact'
import React, { useMemo, useState } from 'react'
import { traverseAndFlattenTrees, traverseTrees } from '../../util'
import type { CuiTreeBasicDataNode, WithChildren } from './CuiTree'

interface FilterOptions {
  primaryTitleFilter?: string
  secondaryTitleFilter?: string
}

const highlightMatch = (text: string, filter: string) => {
  const index = text.search(new RegExp(filter, 'i'))
  const beforeStr = text.substring(0, index)
  const matchedStr = text.substring(index, index + filter.length)
  const afterStr = text.slice(index + filter.length)

  return index > -1
    ? React.createElement('span', {
        children: [
          beforeStr,
          React.createElement(
            'span',
            {
              key: '1',
              style: { backgroundColor: 'rgb(245, 158, 11)' },
            },
            matchedStr,
          ),
          afterStr,
        ],
      })
    : React.createElement('span', {
        children: [text],
      })
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

export const useFilteredData = <T extends CuiTreeBasicDataNode>(
  data: Array<WithChildren<T>>,
) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({})

  const filteredData = useMemo(() => {
    const primaryFilter = filterOptions.primaryTitleFilter
    const secondaryFilter = filterOptions.secondaryTitleFilter

    return traverseTrees(data, (item) => ({
      ...item,
      primaryTitle:
        typeof item.primaryTitle === 'string' && primaryFilter !== undefined
          ? highlightMatch(item.primaryTitle, primaryFilter)
          : item.primaryTitle,
      secondaryTitle:
        typeof item.secondaryTitle === 'string' && secondaryFilter !== undefined
          ? highlightMatch(item.secondaryTitle, secondaryFilter)
          : item.secondaryTitle,
    }))
  }, [data, filterOptions])

  const expandedKeys = useMemo(() => {
    if (
      !filterOptions.primaryTitleFilter &&
      !filterOptions.secondaryTitleFilter
    ) {
      return
    }

    const primaryFilter =
      filterOptions.primaryTitleFilter &&
      new RegExp(filterOptions.primaryTitleFilter, 'i')

    const secondaryFilter =
      filterOptions.secondaryTitleFilter &&
      new RegExp(filterOptions.secondaryTitleFilter, 'i')

    return compact(
      traverseAndFlattenTrees<T, React.Key | undefined>(data, (item) => {
        const primaryTitle = item.primaryTitle
        const secondaryTitle = item.secondaryTitle

        const shouldExpand =
          (typeof primaryTitle === 'string' &&
            primaryFilter &&
            primaryFilter.test(primaryTitle)) ||
          (typeof secondaryTitle === 'string' &&
            secondaryFilter &&
            secondaryFilter.test(secondaryTitle))

        return shouldExpand ? getParentKey(item.key, data) : undefined
      }),
    )
  }, [data, filterOptions])

  return { expandedKeys, filteredData, setFilterOptions }
}
