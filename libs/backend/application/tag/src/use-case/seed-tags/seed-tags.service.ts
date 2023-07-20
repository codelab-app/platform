import type { TagNode, TagNodeData } from '@codelab/backend/abstract/core'
import { AuthUseCase } from '@codelab/backend/application/service'
import { TagRepository } from '@codelab/backend/domain/tag'
import type { ITagDTO } from '@codelab/shared/abstract/core'
import { withTracing } from '@codelab/shared/infra/otel'
import uniqBy from 'lodash/uniqBy'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'
import { TagTreeUtils } from './seed-tags.util'

export class SeedTagsService extends AuthUseCase<TagNode, void> {
  tagRepository: TagRepository = new TagRepository()

  async _execute(tagTree: TagNode) {
    const tags = uniqBy(await this.createTagsData(tagTree), (tag) => tag.name)

    await this.tagRepository.seedTags(tags, this.owner)
  }

  /* *
   * Here we want to flatten the hierarchical data
   */
  async createTagsData(tagTree: TagNode): Promise<Array<ITagDTO>> {
    const existingTags = new Map(
      (await this.tagRepository.find()).map((tag) => [tag.name, tag]),
    )

    const tagData: Array<TagNodeData & { id: string }> = await Promise.all(
      TagTreeUtils.createTagTreeData(tagTree)
        .flatMap((node) => TagTreeUtils.flattenTagTree(node))
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
}
