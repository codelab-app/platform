import { IAtomOutputDto } from '@codelab/backend/abstract/core'
import { ImportApiCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { IAuth0User } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import omit from 'lodash/omit'

@Injectable()
export class ImportAtomCommand {
  constructor(public atomOutput: IAtomOutputDto, public owner: IAuth0User) {}
}

@CommandHandler(ImportAtomCommand)
export class ImportAtomHandler
  implements ICommandHandler<ImportAtomCommand, void>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ImportAtomCommand) {
    const {
      atomOutput: { api, atom },
      owner,
    } = command

    /**
     * Create all atoms but omit `suggestedChildren`, since it requires all atoms to be added first
     */
    await this.atomRepository.save(omit(atom, ['suggestedChildren']))

    /**
     * Here we assign suggestedChildren, since all atoms must be created first
     */
    await this.atomRepository.save(atom)

    await this.commandBus.execute<ImportApiCommand>(
      new ImportApiCommand(api, owner),
    )
  }
}
