import type { TagWhere } from '@codelab/backend/abstract/codegen'
import { SortDirection } from '@codelab/backend/abstract/codegen'
import type { ITagOutputDto } from '@codelab/backend/abstract/core'
import { TagRepository } from '@codelab/backend/domain/tag'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportTagsCommand {
  where?: TagWhere
}

@CommandHandler(ExportTagsCommand)
export class ExportTagsHandler
  implements ICommandHandler<ExportTagsCommand, Array<ITagOutputDto>>
{
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(command: ExportTagsCommand) {
    const { where } = command

    return (
      (
        await this.tagRepository.find({
          options: {
            sort: [{ name: SortDirection.Asc }],
          },
          where,
        })
      )
        // Sort children values
        .map((tag) => ({
          ...tag,
          children: tag.children.sort((a, b) => a.name.localeCompare(b.name)),
        }))
    )
  }
}
