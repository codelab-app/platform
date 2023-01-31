import type { ITag, TagNodeData } from '@codelab/backend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { TagNode } from '@codelab/shared/data/seed'
import { allTagTree, antdTagTree } from '@codelab/shared/data/seed'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

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
        name: node.name,
        parent: node.parent,
        children: node.children,
      },
    ],
  )
}
