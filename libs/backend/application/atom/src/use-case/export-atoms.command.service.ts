import { AtomWhere, SortDirection } from '@codelab/backend/abstract/codegen'
import { AtomRepository } from '@codelab/backend/domain/atom'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

@Injectable()
export class ExportAtomsCommand {
  constructor(readonly where?: AtomWhere) {}
}

@CommandHandler(ExportAtomsCommand)
export class ExportAtomsHandler
  implements ICommandHandler<ExportAtomsCommand, Array<IAtomDTO>>
{
  constructor(private readonly atomRepository: AtomRepository) {}

  async execute(command: ExportAtomsCommand) {
    const atoms = (
      await this.atomRepository.find({
        options: {
          sort: [{ name: SortDirection.Asc }],
        },
      })
    )
      // Sort nested properties, since we can't do this with OGM
      .map((atom) => ({
        ...atom,
        suggestedChildren: atom.suggestedChildren.sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
        tags: atom.tags.map((tag) => ({
          ...tag,
          children: tag.children.sort((a, b) => a.name.localeCompare(b.name)),
        })),
      }))

    return atoms
  }
}
