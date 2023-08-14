import {
  type AtomWhere,
  SortDirection,
} from '@codelab/backend/abstract/codegen'
import type { IAtomExport, ITypesExport } from '@codelab/backend/abstract/core'
import { ExportTypesCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import {
  type IAtomDTO,
  type IInterfaceTypeDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import { IAtom } from 'mobx'

@Injectable()
export class ExportAtomsCommand {
  constructor(readonly where?: AtomWhere) {}
}

@CommandHandler(ExportAtomsCommand)
export class ExportAtomsHandler
  implements ICommandHandler<ExportAtomsCommand, Array<IAtomExport>>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
    private traceService: TraceService,
  ) {}

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

    return Promise.all(atoms.map(async (atom) => this.exportAtom(atom)))
  }

  private async exportAtom(atom: IAtomDTO) {
    this.traceService.getSpan()!.setAttributes({ atom: atom.name })

    const { fields = [], types } = await this.commandBus.execute<
      ExportTypesCommand,
      ITypesExport
    >(
      new ExportTypesCommand({
        typeIds: [atom.api],
      }),
    )

    const api = types.filter(
      (type): type is IInterfaceTypeDTO =>
        type.kind === ITypeKind.InterfaceType,
    )[0]

    if (!api) {
      throw new Error('Missing interface type')
    }

    return {
      api,
      atom,
      fields,
      types,
    }
  }
}
