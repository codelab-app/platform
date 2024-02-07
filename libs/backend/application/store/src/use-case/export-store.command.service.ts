import type { StoreWhere } from '@codelab/backend/abstract/codegen'
import { ExportResourcesCommand } from '@codelab/backend/application/resource'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { StoreRepository } from '@codelab/backend/domain/store'
import type { ApiAction } from '@codelab/shared/abstract/codegen'
import type { IResource, IStoreExport } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportStoreCommand {
  constructor(public where: StoreWhere) {}
}

@CommandHandler(ExportStoreCommand)
export class ExportStoreHandler
  implements ICommandHandler<ExportStoreCommand, IStoreExport>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportStoreCommand) {
    const store = await this.storeRepository.findOne(where)

    if (!store) {
      throw new Error('Cannot find Component Store')
    }

    const api = await this.commandBus.execute<ExportApiCommand>(
      new ExportApiCommand(store.api),
    )

    const resourceIds = await store.actions.reduce<Array<string>>(
      (acc, action) => {
        if (
          action.type === IActionKind.ApiAction &&
          !acc.includes((action as ApiAction).resource.id)
        ) {
          acc.push((action as ApiAction).resource.id)
        }

        return acc
      },
      [],
    )

    const resources = await this.commandBus.execute<
      ExportResourcesCommand,
      Array<IResource>
    >(new ExportResourcesCommand({ id_IN: resourceIds }))

    return {
      ...store,
      api,
      resources,
    }
  }
}
