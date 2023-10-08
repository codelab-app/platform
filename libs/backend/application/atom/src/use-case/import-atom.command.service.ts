import { ImportApiCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { IAtomBoundedContext } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import omit from 'lodash/omit'

@Injectable()
export class ImportAtomCommand {
  constructor(public atomAggregate: IAtomBoundedContext) {}
}

@CommandHandler(ImportAtomCommand)
export class ImportAtomHandler
  implements ICommandHandler<ImportAtomCommand, void>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
  ) {}

  @Span()
  async execute(command: ImportAtomCommand) {
    const {
      atomAggregate: { api, atom },
    } = command

    await this.commandBus.execute<ImportApiCommand>(new ImportApiCommand(api))

    /**
     * Create all atoms but omit `suggestedChildren`, since it requires all atoms to be added first
     */
    await this.atomRepository.save(omit(atom, ['suggestedChildren']))

    /**
     * Here we assign suggestedChildren, since all atoms must be created first
     */
    await this.atomRepository.save(atom)
  }
}
