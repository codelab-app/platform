import { type AtomWhere } from '@codelab/backend/abstract/codegen'
import type { IApiOutputDto } from '@codelab/backend/abstract/core'
import { IAtomOutputDto } from '@codelab/backend/abstract/core'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { IAtomDTO } from '@codelab/shared/abstract/core'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { Typebox } from '@codelab/shared/infra/validation'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportAtomCommand {
  constructor(readonly where: AtomWhere) {}
}

@CommandHandler(ExportAtomCommand)
export class ExportAtomHandler
  implements ICommandHandler<ExportAtomCommand, IAtomOutputDto>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
    private traceService: TraceService,
    private validationService: ValidationService,
  ) {}

  @Span()
  async execute(command: ExportAtomCommand): Promise<IAtomOutputDto> {
    const { where } = command

    const atom = await this.atomRepository.findOne(
      where,
      Typebox.OmitOwner(IAtomDTO),
    )

    if (!atom) {
      throw new Error('Atom not found')
    }

    // this.traceService.getSpan()!.setAttributes({ atom: atom.name })

    const api = await this.commandBus.execute<ExportApiCommand, IApiOutputDto>(
      new ExportApiCommand(atom.api),
    )

    const data: IAtomOutputDto = {
      api,
      atom,
    }

    const results: IAtomOutputDto = this.validationService.validateAndClean(
      IAtomOutputDto,
      data,
    )

    return results
  }
}
