import {
  type AtomWhere,
  SortDirection,
} from '@codelab/backend/abstract/codegen'
import type {
  IApiOutputDto,
  IAtomOutputDto,
} from '@codelab/backend/abstract/core'
import { ExportTypesCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { type IAtomDTO } from '@codelab/shared/abstract/core'
import { Span } from '@codelab/shared/infra/otel'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportAtomsCommand {
  constructor(readonly where?: AtomWhere) {}
}

@CommandHandler(ExportAtomsCommand)
export class ExportAtomsHandler
  implements ICommandHandler<ExportAtomsCommand, Array<IAtomOutputDto>>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
    private traceService: TraceService,
  ) {}

  @Span()
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
        api: {
          ...atom.api,
        },
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

  @Span()
  private async exportAtom(atom: IAtomDTO) {
    this.traceService.getSpan()!.setAttributes({ atom: atom.name })

    const api = await this.commandBus.execute<
      ExportTypesCommand,
      IApiOutputDto
    >(new ExportTypesCommand([atom.api]))

    return {
      api,
      atom,
    }
  }
}
