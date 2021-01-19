import { left, right } from 'fp-ts/Either'
import { isNone } from 'fp-ts/Option'
import { PageRepositoryPort } from '../../../adapters/PageRepositoryPort'
import { GetPageErrors } from './GetPageErrors'
import { GetPageRequest } from './GetPageRequest'
import { GetPageResponse } from './GetPageResponse'
import { GetPageUseCase } from './GetPageUseCase'
import { Result } from '@codelab/backend'

export class GetPageService implements GetPageUseCase {
  constructor(private readonly pageRepository: PageRepositoryPort) {}

  async execute({ pageId }: GetPageRequest): Promise<GetPageResponse> {
    const page = await this.pageRepository.findSingle({ pageId })

    if (isNone(page)) {
      return left(new GetPageErrors.DemoError(pageId))
    }

    return right(Result.ok(page))
  }
}
