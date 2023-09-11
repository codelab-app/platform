/* eslint-disable @nx/enforce-module-boundaries */
import { Tag, TagRepository } from '@codelab/backend/domain/tag'
import type { IAuth0Owner, IAuth0User } from '@codelab/shared/abstract/core'
import { createTagsData } from '@codelab/shared/data/test'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedTagCommand {}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedTagCommand)
export class SeedTagHandler implements ICommandHandler<SeedTagCommand, void> {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute() {
    const tagsData = createTagsData()

    /**
     * Create the types
     */
    const tags = tagsData.map((tagData) => {
      return new Tag(tagData)
    })

    await this.tagRepository.add(tags)
  }
}
