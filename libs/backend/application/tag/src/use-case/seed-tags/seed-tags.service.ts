import type { TagNodeData } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { TagRepository } from '@codelab/backend/domain/tag'
import type { IAuth0Owner, ITagDTO } from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'
import { createTagTreeData, flattenTagTree } from './tag-input.factory'

export class SeedTagsService extends IUseCase<IAuth0Owner, void> {
  tagRepository: TagRepository = new TagRepository()

  async _execute(owner: IAuth0Owner) {
    const tags = await this.createTagsData(owner)

    /**
     * Omit parent and children since they need to be created first
     */
    await Promise.all(
      tags.map(
        async ({ children, parent, ...tag }) =>
          await this.tagRepository.save(
            { ...tag, children: [], owner },
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
  private async createTagsData(owner: IAuth0Owner): Promise<Array<ITagDTO>> {
    const existingTags = new Map(
      (await this.tagRepository.find()).map((tag) => [tag.name, tag]),
    )

    const tagData: Array<TagNodeData & { id: string }> = await Promise.all(
      createTagTreeData()
        .flatMap((node) => flattenTagTree(node))
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
        owner,
        parent: parent ? { id: parent.id, name: parent.name } : undefined,
      }
    })
  }
}
