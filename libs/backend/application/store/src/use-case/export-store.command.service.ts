import type { StoreWhere } from '@codelab/backend/abstract/codegen'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { ResourceRepository } from '@codelab/backend/domain/resource'
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
    private readonly resourceRepository: ResourceRepository,
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

    const sortedActions = store.actions.sort((a, b) => {
      // put actions that are referenced from another action via field successAction or errorAction first
      // so that they are imported before the actions that reference them
      return a.type === IActionKind.ApiAction &&
        ((a as ApiAction).successAction || (a as ApiAction).errorAction)
        ? 1
        : -1
    })

    const resources = await this.resourceRepository.find({
      where: { id_IN: resourceIds },
    })

    return {
      ...store,
      actions: sortedActions,
      api,
      resources,
    }
  }
}
