import type {
  ITag,
  IOwner,
  TagNodeData,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { TagRepository } from '@codelab/backend/domain/tag'
import { v4 } from 'uuid'
import { createTagTreeData, flattenTagTree } from './tag-input.factory'

export class SeedTagsService extends IUseCase<IOwner, void> {
  tagRepository: TagRepository = new TagRepository()

  async _execute(owner: IOwner) {
    const tags = await this.createTagsData(owner)

    await Promise.all(
      tags.map(
        async (tag) => await this.tagRepository.save(tag, { name: tag.name }),
      ),
    )
  }

  /**
   * Here we want to flatten the hierarchical data
   */
  private async createTagsData(owner: IOwner): Promise<Array<ITag>> {
    const existingTags = new Map(
      (await this.tagRepository.all()).map((tag) => [tag.name, tag]),
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
        id: tag.id,
        name: tag.name,
        owner,
        parent: parent ? { id: parent.id, name: parent.name } : undefined,
      }
    })
  }
}
