import { right } from 'fp-ts/lib/Either'
import { PageRepositoryPort } from '../../../adapters/PageRepositoryPort'
import { Page } from '../../../domain/page'
import { GetPagesRequest } from './GetPagesRequest'
import { GetPagesResponse } from './GetPagesResponse'
import { GetPagesUseCase } from './GetPagesUseCase'
import { Result } from '@codelab/backend'

export class GetPagesService implements GetPagesUseCase {
  constructor(private readonly pageRepository: PageRepositoryPort) {}

  async execute({ appId }: GetPagesRequest): Promise<GetPagesResponse> {
    const pages = await this.pageRepository.findMany({
      app: {
        id: appId,
      },
    })

    const results = pages.map((page) => Page.hydrate(page))

    return right(Result.ok(results))
  }
}
