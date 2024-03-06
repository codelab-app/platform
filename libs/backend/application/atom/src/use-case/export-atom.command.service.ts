import { type AtomWhere } from '@codelab/backend/abstract/codegen'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { Span } from '@codelab/backend/infra/adapter/otel'
import type { IApi, IAtom, IAtomAggregate } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import omit from 'lodash/omit'

export class ExportAtomCommand {
  constructor(readonly where: AtomWhere) {}
}

@CommandHandler(ExportAtomCommand)
export class ExportAtomHandler
  implements ICommandHandler<ExportAtomCommand, IAtomAggregate>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
  ) {}

  @Span()
  async execute(command: ExportAtomCommand): Promise<IAtomAggregate> {
    const { where } = command
    const existingAtom = await this.atomRepository.findOneOrFail({ where })

    const api = await this.commandBus.execute<ExportApiCommand, IApi>(
      new ExportApiCommand(existingAtom.api),
    )

    const atom: IAtom = {
      ...existingAtom,
      __typename: 'Atom' as const,
      api: { id: api.id },
      tags: existingAtom.tags.map((tag) => ({ id: tag.id })),
    }

    // const results: IAtom = this.validationService.validateAndClean(IAtom, data)

    return {
      api: omit(api, 'owner'),
      atom: omit(atom, 'owner'),
    }
  }
}
