import type {
  ITag,
  IUserRef,
  TagNodeData,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { TagRepository } from '@codelab/backend/domain/tag'
import { v4 } from 'uuid'
import { createTagTreeData, flattenTagTree } from './tag-input.factory'

export class SeedTagsService extends IUseCase<IUserRef, void> {
  tagRepository: TagRepository = new TagRepository()

  async _execute(owner: IUserRef) {
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
  private async createTagsData(owner: IUserRef): Promise<Array<ITag>> {
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
        id: tag.id,
        owner,
        name: tag.name,
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
        parent: parent ? { id: parent.id, name: parent.name } : undefined,
      }
    })
  }
}
