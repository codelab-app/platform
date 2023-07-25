/* eslint-disable @nx/enforce-module-boundaries */
import { Tag, TagRepository } from '@codelab/backend/domain/tag'
import type { IAuth0Owner, IAuth0User } from '@codelab/shared/abstract/core'
import { createTagsData } from '@codelab/shared/data/test'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedTagCommand implements IAuth0Owner {
  constructor(public owner: IAuth0User) {}
}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedTagCommand)
export class SeedTagHandler implements ICommandHandler<SeedTagCommand, void> {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(command: SeedTagCommand) {
    const { owner } = command
    const tagsData = createTagsData(owner)

    /**
     * Create the types
     */
    const tags = tagsData.map((tagData) => {
      return new Tag(tagData)
    })

    await this.tagRepository.add(tags)
  }
}
