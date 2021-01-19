import { EventPublisher, QueryBus } from '@nestjs/cqrs'
import { left, right } from 'fp-ts/Either'
import { Option, isNone } from 'fp-ts/Option'
import {
  Propagation,
  Transactional,
  runOnTransactionCommit,
} from 'typeorm-transactional-cls-hooked'
import { GetAppQuery } from '../../../../../../app/src/core/application/queries/GetAppQuery'
import { App } from '../../../../../../app/src/core/domain/app'
import { PageRepositoryPort } from '../../../adapters/PageRepositoryPort'
import { Page } from '../../../domain/page'
import { CreatePageErrors } from './CreatePageErrors'
import { CreatePageRequest } from './CreatePageRequest'
import { CreatePageResponse } from './CreatePageResponse'
import { CreatePageUseCase } from './CreatePageUseCase'
import { Result } from '@codelab/backend'

export class CreatePageService implements CreatePageUseCase {
  constructor(
    private readonly pageRepository: PageRepositoryPort,
    private readonly publisher: EventPublisher,
    private readonly queryBus: QueryBus,
  ) {}

  @Transactional({ propagation: Propagation.NESTED })
  async execute(request: CreatePageRequest): Promise<CreatePageResponse> {
    const { appId } = request
    const page = new Page(request)

    const user: any = {}

    const app: Option<App> = await this.queryBus.execute(
      new GetAppQuery({ appId, user }),
    )

    if (isNone(app)) {
      return left(new CreatePageErrors.AppNotFoundError(appId))
    }

    const createdPage: Page = this.publisher.mergeObjectContext(
      await this.pageRepository.createPage(page),
    )

    runOnTransactionCommit(() => {
      createdPage.createPage(app.value)
      createdPage.commit()
    })

    return right(Result.ok(createdPage))
  }
}
