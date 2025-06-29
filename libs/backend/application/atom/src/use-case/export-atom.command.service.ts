import type { ICommandHandler } from '@nestjs/cqrs'

import { ExportApiCommand } from '@codelab/backend-application-type'
import { AtomRepository } from '@codelab/backend-domain-atom'
import {
  AtomAggregateSchema,
  AtomSchema,
  type IApiAggregate,
  type IAtomAggregate,
  ITypeKind,
} from '@codelab/shared-abstract-core'
import { type AtomWhere } from '@codelab/shared-infra-gqlgen'
import { logger } from '@codelab/shared-infra-logging'
import { Validator } from '@codelab/shared-infra-typebox'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import { Type } from '@sinclair/typebox'

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

    const existingAtom = await this.atomRepository.findOneOrFail({
      schema: Type.Omit(AtomSchema, ['owner']),
      where,
    })

    const api = await this.commandBus.execute<ExportApiCommand, IApiAggregate>(
      new ExportApiCommand({
        ...existingAtom.api,
        __typename: ITypeKind.InterfaceType,
      }),
    )

    const atom = {
      ...existingAtom,
      __typename: 'Atom' as const,
      api,
      requiredParents: existingAtom.requiredParents?.sort((a, b) =>
        a.id.localeCompare(b.id),
      ),
      suggestedChildren: existingAtom.suggestedChildren?.sort((a, b) =>
        a.id.localeCompare(b.id),
      ),
      tags: existingAtom.tags?.map((tag) => ({ id: tag.id })),
    }

    // logger.debug('Export atom api', api)

    const results = Validator.parse(AtomAggregateSchema, { api, atom })

    // logger.debug('Export atom results', results)

    return results
  }
}
