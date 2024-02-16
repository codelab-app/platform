import { TagRepository } from '@codelab/backend/domain/tag'
import type { ITagDto } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
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
     */
    for (const tag of tags) {
      const { children, descendants, isRoot, parent, ...createTagData } = tag

      await this.tagRepository.save(createTagData)
    }

    /**
     * set parent and children after all tags are created
     */
    for (const tag of tags) {
      const { descendants, isRoot, ...updateTagData } = tag

      await this.tagRepository.save(updateTagData)
    }
  }
}
