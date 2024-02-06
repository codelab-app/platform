import type { ResourceWhere } from '@codelab/backend/abstract/codegen'
import { ResourceRepository } from '@codelab/backend/domain/resource'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportResourceCommand {
  constructor(public where: ResourceWhere) {}
}

@CommandHandler(ExportResourceCommand)
export class ExportResourceHandler implements ICommandHandler<ExportResourceCommand> {
  constructor(
    private readonly resourceRepository: ResourceRepository,
  ) {}

  async execute({ where }: ExportResourceCommand) {
    const resource = await this.resourceRepository.findOne(where)

    if (!resource) {
      throw new Error('Cannot find Resource')
    }

    return {
      resource,
    }
  }
}
