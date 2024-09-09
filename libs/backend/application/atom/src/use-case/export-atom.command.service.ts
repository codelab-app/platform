import { type AtomWhere } from '@codelab/backend/abstract/codegen'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import {
  ApiSchema,
  AtomSchema,
  type IApi,
  type IAtom,
  type IAtomAggregate,
} from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/schema'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import { omit } from 'radash'

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
      api: Validator.validateAndClean(ApiSchema, api),
      atom: Validator.validateAndClean(AtomSchema, atom),
    }
  }
}
