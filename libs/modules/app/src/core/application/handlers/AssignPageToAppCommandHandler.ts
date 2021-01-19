import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import {
  Propagation,
  Transactional,
  runOnTransactionRollback,
} from 'typeorm-transactional-cls-hooked'
import { AssignPageToAppSuccessEvent } from '../../../../../page/src/core/application/useCases/createPage/AssignPageToAppSuccessEvent'
import { PageCreateErrorEvent } from '../../../../../page/src/core/application/useCases/createPage/PageCreateErrorEvent'
import { Page } from '../../../../../page/src/core/domain/page'
import { AppDITokens } from '../../../framework/AppDITokens'
import { AppRepositoryPort } from '../../adapters/AppRepositoryPort'
import { App } from '../../domain/app'
import { AssignPageToAppCommand } from '../commands/AssignPageToAppCommand'

@CommandHandler(AssignPageToAppCommand)
export class AssignPageToAppCommandHandler
  implements ICommandHandler<AssignPageToAppCommand> {
  constructor(
    @Inject(AppDITokens.AppRepository)
    private readonly appRepository: AppRepositoryPort,
    private readonly eventBus: EventBus,
  ) {}

  @Transactional({ propagation: Propagation.NESTED })
  public async execute({ app, page }: AssignPageToAppCommand) {
    try {
      await this.appRepository.addPageToApp(
        App.hydrate(App, app),
        Page.hydrate(Page, page),
      )
      this.eventBus.publish(new AssignPageToAppSuccessEvent(page))
    } catch (e) {
      await this.appRepository.manager.queryRunner?.rollbackTransaction()
    }

    runOnTransactionRollback(() => {
      this.eventBus.publish(new PageCreateErrorEvent(page))
    })
  }
}
