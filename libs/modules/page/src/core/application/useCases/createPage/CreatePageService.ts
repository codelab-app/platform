import { EventPublisher, QueryBus } from '@nestjs/cqrs'
import { Option, isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { GetAppByIdQuery } from '../../../../../../app/src/core/application/queries/GetAppByIdQuery'
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

  async execute(request: CreatePageRequest): Promise<CreatePageResponse> {
    const { appId } = request
    const page = new Page(request)

    const app: Option<App> = await this.queryBus.execute(
      new GetAppByIdQuery({ appId }),
    )

    if (isNone(app)) {
      return left(new CreatePageErrors.AppNotFoundError(appId))
    }

    const createdPage: Page = this.publisher.mergeObjectContext(
      await this.pageRepository.createPage(page),
    )

    createdPage.createPage(app.value)
    createdPage.commit()

    return right(Result.ok(createdPage))
  }
}
