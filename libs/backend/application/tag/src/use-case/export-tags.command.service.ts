import type { ITagExport } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { TagRepository } from '@codelab/backend/domain/tag'
import { SortDirection, TagWhere } from '@codelab/shared/infra/gqlgen'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportTagsCommand {
  where?: TagWhere
}

@CommandHandler(ExportTagsCommand)
export class ExportTagsHandler
  implements ICommandHandler<ExportTagsCommand, Array<ITagExport>>
{
  constructor(private readonly tagRepository: TagRepository) {}

  async execute({ where }: ExportTagsCommand) {
    const tags = await this.tagRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      where,
    })

    // We don't need owner or descendants for now
    return tags.map(({ descendants, owner, ...tag }) => ({
      ...tag,
      // Sort children values and remove owner and descendants from each child
      children: tag.children
        .map(({ owner: childOwner, ...child }) => child)
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
  }
}
