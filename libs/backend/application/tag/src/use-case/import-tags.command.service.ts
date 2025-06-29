import type { ITagDto } from '@codelab/shared-abstract-core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { TagRepository } from '@codelab/backend-domain-tag'
import { CommandHandler } from '@nestjs/cqrs'

export class ImportTagsCommand {
  constructor(public tags: Array<ITagDto>) {}
}

@CommandHandler(ImportTagsCommand)
export class ImportTagsHandler
  implements ICommandHandler<ImportTagsCommand, void>
{
  constructor(private tagRepository: TagRepository) {}

  /**
   * Seed tags solve the issue of missing target children or parent when creating them for the first time
   */
  async execute({ tags }: ImportTagsCommand) {
    /**
     * Omit parent and children since they need to be created first
     * Can use Promise.all here since we're not creating any relationships
     */
    await Promise.all(
      tags.map(async (tag) => {
        const { children, descendants, parent, ...createTagData } = tag

        return this.tagRepository.save(createTagData)
      }),
    )

    /**
     * Set parent and children after all tags are created
     * Must be sequential since tags have parent/children relationships
     * that could cause Neo4j deadlocks if updated in parallel
     */
    for (const tag of tags) {
      const { descendants, ...updateTagData } = tag

      await this.tagRepository.save(updateTagData)
    }
  }
}
