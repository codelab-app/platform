import type { TagNode, TagNodeData } from '@codelab/backend/abstract/core'
import type { ITagDto } from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { TagRepository } from '@codelab/backend/domain/tag'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { uniqueBy } from 'remeda'
import { v4 } from 'uuid'

import { ImportTagsCommand } from '../import-tags.command.service'
import { TagTreeUtils } from './seed-tags.util'

@Injectable()
export class SeedTagsService {
  constructor(
    private tagRepository: TagRepository,
    private commandBus: CommandBus,
    private authService: AuthDomainService,
  ) {}

  /* *
   * Here we want to flatten the hierarchical data
   */
  async createTagsData(tagTree: TagNode): Promise<Array<ITagDto>> {
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
        owner: this.authService.currentUser,
        parent: parent ? { id: parent.id, name: parent.name } : undefined,
      }
    })
  }

  async execute(tagTree: TagNode) {
    const tags = uniqueBy(await this.createTagsData(tagTree), (tag) => tag.name)

    await this.commandBus.execute<ImportTagsCommand>(
      new ImportTagsCommand(tags),
    )
  }
}
