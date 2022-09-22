import { isObject } from 'lodash'
import { ObjectTyped } from 'object-typed'
import { antdTagTree, TagNode } from './antd-tag-tree.data'

// Create hierarchical data from data file
interface TagNodeData {
  name: string
  parent: string | null
  children: Array<TagNodeData>
}

const parseTagNode = (node: TagNode, parent: string | null): TagNodeData => {
  if (!node) {
    throw new Error('Missing node')
  }

  // Meaning have children
  if (isObject(node)) {
    const [name, values] = Object.entries(node)[0]

    return {
      parent,
      name,
      children: values.map((value) => parseTagNode(value, name)),
    }
  }

  // No children
  return {
    parent,
    name: node,
    children: [],
  }
}

/**
 * Generate parent/children by inference via object nested relationship
 */
export const createTagTreeData = () =>
  ObjectTyped.entries(antdTagTree).flatMap(([tagKey, tagNode]) => [
    parseTagNode({ [tagKey]: tagNode ?? [] }, null),
  ])

export const flattenTagTree = (node: TagNodeData): Array<TagNodeData> => {
  return node.children.map(flattenTagTree).reduce(
    (tagTree: Array<TagNodeData>, tagNodes: Array<TagNodeData>) => {
      return [...tagTree, ...tagNodes]
    },
    [
      {
        name: node.name,
        parent: node.parent,
        children: node.children,
      },
    ],
  )
}

// Here we want to flatten the hierarchical data
export const createTagSeedData = () =>
  createTagTreeData().flatMap((node) => flattenTagTree(node))
