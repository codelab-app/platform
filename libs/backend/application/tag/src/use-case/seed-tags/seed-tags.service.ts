import type { TagNode, TagNodeData } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { TagRepository } from '@codelab/backend/domain/tag'
import type { IAuth0Owner, ITagDTO } from '@codelab/frontend/abstract/core'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

export class SeedTagsService extends IUseCase<TagNode, void> {
  tagRepository: TagRepository = new TagRepository()

  constructor(private readonly owner: IAuth0Owner) {
    super()
  }

  async _execute(tagTree: TagNode) {
    const tags = await this.createTagsData(tagTree)

    /**
     * Omit parent and children since they need to be created first
     */
    await Promise.all(
      tags.map(
        async ({ children, parent, ...tag }) =>
          await this.tagRepository.save(
            { ...tag, children: [], owner: this.owner },
            { name: tag.name },
          ),
      ),
    )

    /**
     * set parent and children after all tags are created
     */
    await Promise.all(
      tags.map(
        async (tag) => await this.tagRepository.save(tag, { name: tag.name }),
      ),
    )
  }

  /**
   * Here we want to flatten the hierarchical data
   */
  private async createTagsData(tagTree: TagNode): Promise<Array<ITagDTO>> {
    const existingTags = new Map(
      (await this.tagRepository.find()).map((tag) => [tag.name, tag]),
    )

    const tagData: Array<TagNodeData & { id: string }> = await Promise.all(
      SeedTagsService.createTagTreeData(tagTree)
        .flatMap((node) => SeedTagsService.flattenTagTree(node))
        .map(async (node) => {
          const existingTag = existingTags.get(node.name)

          return { ...node, id: existingTag?.id ?? v4() }
        }),
    )

    const tagDataMap = new Map(tagData.map((tag) => [tag.name, tag]))

    return tagData.map((tag) => {
      const parent = tag.parent ? tagDataMap.get(tag.parent) : null

      return {
        children: tag.children.map((child) => {
          const childTag = tagDataMap.get(child.name)

          if (!childTag) {
            throw new Error('Missing child tag')
          }

          return {
            id: childTag.id,
            name: childTag.name,
          }
        }),
        descendants: [],
        id: tag.id,
        name: tag.name,
        owner: this.owner,
        parent: parent ? { id: parent.id, name: parent.name } : undefined,
      }
    })
  }

  /**
   * Generate parent/children by inference via object nested relationship
   */
  static createTagTreeData = (tagTreeData: TagNode): Array<TagNodeData> =>
    Object.entries(tagTreeData).flatMap(([tagKey, tagNode]) => [
      SeedTagsService.parseTagNode({ [tagKey]: tagNode }, null),
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
