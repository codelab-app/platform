import { TagRepository } from '@codelab/backend/domain/tag'
import type { IAuth0User, ITagDTO } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ImportTagsCommand {
  constructor(public tags: Array<ITagDTO>, public owner: IAuth0User) {}
}

@CommandHandler(ImportTagsCommand)
export class ImportTagsHandler
  implements ICommandHandler<ImportTagsCommand, void>
{
  constructor(private tagRepository: TagRepository) {}

  /**
   * Seed tags solve the issue of missing target children or parent when creating them for the first time
   */
  async execute(command: ImportTagsCommand) {
    const { owner, tags } = command

    /**
     * Omit parent and children since they need to be created first
     */
    for (const tag of tags) {
      await this.tagRepository.save({ ...tag, owner }, { name: tag.name })
    }

    /**
     * set parent and children after all tags are created
     */
    for (const tag of tags) {
      await this.tagRepository.save(tag, { name: tag.name })
    }
  }
}
