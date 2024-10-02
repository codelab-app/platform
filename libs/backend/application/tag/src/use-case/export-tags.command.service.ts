import type { TagWhere } from '@codelab/backend/abstract/codegen'
import type { ITag } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { SortDirection } from '@codelab/backend/abstract/codegen'
import { TagRepository } from '@codelab/backend/domain/tag'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportTagsCommand {
  where?: TagWhere
}

@CommandHandler(ExportTagsCommand)
export class ExportTagsHandler
  implements ICommandHandler<ExportTagsCommand, Array<ITag>>
{
  constructor(private readonly tagRepository: TagRepository) {}

  async execute({ where }: ExportTagsCommand) {
    const tags = await this.tagRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      where,
    })

    // We don't need owner for now
    return tags.map(({ owner, ...tag }) => ({
      ...tag,
      // Sort children values
      children: tag.children.sort((a, b) => a.name.localeCompare(b.name)),
    }))
  }
}
