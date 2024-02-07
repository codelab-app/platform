import type { ResourceWhere } from '@codelab/backend/abstract/codegen'
import { ResourceRepository } from '@codelab/backend/domain/resource'
import { Span } from '@codelab/backend/infra/adapter/otel'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportResourcesCommand {
  constructor(public where: ResourceWhere) {}
}

@CommandHandler(ExportResourcesCommand)
export class ExportResourcesHandler
  implements ICommandHandler<ExportResourcesCommand>
{
  constructor(private readonly resourceRepository: ResourceRepository) {}

  @Span()
  async execute({ where }: ExportResourcesCommand) {
    const resources = await this.resourceRepository.find({ where })

    return resources
  }
}
