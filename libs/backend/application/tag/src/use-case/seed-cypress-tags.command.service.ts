import { Tag, TagRepository } from '@codelab/backend/domain/tag'
import { createTagsData } from '@codelab/shared/data/test'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedCypressTagsCommand {}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedCypressTagsCommand)
export class SeedCypressTagsHandler
  implements ICommandHandler<SeedCypressTagsCommand, void>
{
  constructor(private readonly tagRepository: TagRepository) {}

  async execute() {
    const tagsData = createTagsData

    /**
     * Create the types
     */
    const tags = tagsData.map((tagData) => {
      return new Tag(tagData)
    })

    await this.tagRepository.addMany(tags)
  }
}
