import type { ICommandHandler } from '@nestjs/cqrs'

import { type AtomWhere } from '@codelab/backend/abstract/codegen'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import {
  AtomExportSchema,
  AtomSchema,
  type IApiExport,
  type IAtomExport,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/schema'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import { Type } from '@sinclair/typebox'

export class ExportAtomCommand {
  constructor(readonly where: AtomWhere) {}
}

@CommandHandler(ExportAtomCommand)
export class ExportAtomHandler
  implements ICommandHandler<ExportAtomCommand, IAtomExport>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ExportAtomCommand): Promise<IAtomExport> {
    const { where } = command

    const existingAtom = await this.atomRepository.findOneOrFail({
      schema: Type.Omit(AtomSchema, ['owner']),
      where,
    })

    const api = await this.commandBus.execute<ExportApiCommand, IApiExport>(
      new ExportApiCommand({
        ...existingAtom.api,
        __typename: ITypeKind.InterfaceType,
      }),
    )

    const atom = {
      ...existingAtom,
      __typename: 'Atom' as const,
      api: { id: api.id },
      tags: existingAtom.tags?.map((tag) => ({ id: tag.id })),
    }

    return Validator.validateAndClean(AtomExportSchema, { api, atom })
  }
}
