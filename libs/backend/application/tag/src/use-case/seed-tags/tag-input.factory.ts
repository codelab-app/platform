import type { TagNodeData } from '@codelab/backend/abstract/core'
import type { TagNode } from '@codelab/shared/data/seed'
import { allTagTree } from '@codelab/shared/data/seed'
import { ObjectTyped } from 'object-typed'

/**
 * Function to parse our custom tag structure that is optimized for easy manual editing
 */
const parseTagNode = (node: TagNode, parent: string | null): TagNodeData => {
  if (!node) {
    throw new Error('Missing node')
  }

  // Meaning have children
  if (node instanceof Object) {
    const tagNode = Object.entries(node)[0]

    if (!tagNode) {
      throw new Error('Tag node invalid')
    }

    const [name, values] = tagNode

    return {
      children: values.map((value) => parseTagNode(value, name)),
      name,
      parent,
    }
  }

  // No children
  return {
    children: [],
    name: node,
    parent,
  }
}

/**
 * Generate parent/children by inference via object nested relationship
 */
export const createTagTreeData = (): Array<TagNodeData> =>
  ObjectTyped.entries(allTagTree).flatMap(([tagKey, tagNode]) => [
    parseTagNode({ [tagKey]: tagNode ?? [] }, null),
  ])

export const flattenTagTree = (node: TagNodeData): Array<TagNodeData> => {
  return node.children.map(flattenTagTree).reduce(
    (tagTree: Array<TagNodeData>, tagNodes: Array<TagNodeData>) => {
      return [...tagTree, ...tagNodes]
    },
    [
      {
        children: node.children,
        name: node.name,
        parent: node.parent,
      },
    ],
  )
}
