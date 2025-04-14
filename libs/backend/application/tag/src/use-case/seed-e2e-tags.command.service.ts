import type { ICommandHandler } from '@nestjs/cqrs'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { Tag, TagRepository } from '@codelab/backend/domain/tag'
import { createTagsData } from '@codelab/shared/data/test'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedE2eTagsCommand {}

/**
 * Used as endpoint for creating E2e data
 */
@CommandHandler(SeedE2eTagsCommand)
export class SeedE2eTagsHandler
  implements ICommandHandler<SeedE2eTagsCommand, void>
{
  constructor(
    private readonly tagRepository: TagRepository,
    private authService: AuthDomainService,
  ) {}

  async execute() {
    const tagsData = createTagsData
    const owner = this.authService.currentUser

    /**
     * Create the types
     */
    const tags = tagsData.map((tagData) => {
      return new Tag({ ...tagData, owner })
    })

    await this.tagRepository.addMany(tags)
  }
}
