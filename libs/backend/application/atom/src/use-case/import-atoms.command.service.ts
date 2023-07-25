import { AtomRepository } from '@codelab/backend/domain/atom'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

@Injectable()
export class ImportAtomsCommand {
  constructor(readonly atoms: Array<IAtomDTO>) {}
}

@CommandHandler(ImportAtomsCommand)
export class ImportAtomsHandler
  implements ICommandHandler<ImportAtomsCommand, void>
{
  constructor(private readonly atomRepository: AtomRepository) {}

  async execute({ atoms }: ImportAtomsCommand) {
    /**
     * Create all atoms but omit `suggestedChildren`, since that is required
     */
    await Promise.all(
      atoms.map(
        // Omit `suggestedChildren`, since it requires all atoms to be added first
        async ({ suggestedChildren, ...atom }) =>
          await this.atomRepository.save(atom),
      ),
    )

    /**
     * Here we assign  suggestedChildren, since all atoms must be created first
     */
    await Promise.all(
      atoms.map(async (atom) => await this.atomRepository.save(atom)),
    )
  }
}
