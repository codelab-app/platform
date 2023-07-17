import type { TagNode, TagNodeData } from '@codelab/backend/abstract/core'
import { ObjectTyped } from 'object-typed'

export class TagTreeUtils {
  /**
   * Generate parent/children by inference via object nested relationship
   */
  static createTagTreeData = (tagTreeData: TagNode): Array<TagNodeData> =>
    Object.entries(tagTreeData).flatMap(([tagKey, tagNode]) => [
      TagTreeUtils.parseTagNode({ [tagKey]: tagNode }, null),
    ])

  /**
   * Function to parse our custom tag structure that is optimized for easy manual editing
   */
  static parseTagNode = (node: TagNode, parent: string | null): TagNodeData => {
    // if (!node) {
    //   throw new Error('Missing node')
    // }

    // Meaning have children
    if (node instanceof Object) {
      const tagNode = ObjectTyped.entries(node)[0]

      if (!tagNode) {
        throw new Error('Tag node invalid')
      }

      const [name, values] = tagNode

      return {
        children: (values ?? []).map((value) => this.parseTagNode(value, name)),
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

  static flattenTagTree = (node: TagNodeData): Array<TagNodeData> => {
    return node.children.map(this.flattenTagTree).reduce(
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
}
