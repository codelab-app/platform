import { ITagExport } from '@codelab/backend/abstract/core'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'
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
export const createTagSeedData = (): Array<ITagExport> => {
  const tagData: Array<TagNodeData & { id: string }> = createTagTreeData()
    .flatMap((node) => flattenTagTree(node))
    .map((node) => ({ ...node, id: v4() }))

  const tagDataMap = new Map(tagData.map((tag) => [tag.name, tag]))

  return tagData.map((tag) => {
    const parent = tag.parent ? tagDataMap.get(tag.parent) : null

    return {
      id: tag.id,
      name: tag.name,
      children: tag.children.map((child) => {
        const childTag = tagDataMap.get(child.name)

        return {
          id: childTag ? childTag.name : v4(),
        }
      }),
      parent: parent ? { id: parent.id } : undefined,
    }
  })
}
