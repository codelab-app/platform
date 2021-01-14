import { plainToClass } from 'class-transformer'
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
      appId,
    })

    return right(Result.ok(plainToClass(Page, pages)))

    // const page = Page.create(request)

    // const pageAlreadyExists = await this.pageRepository.exists({
    //   email: user.email.toString(),
    // })

    // if (pageAlreadyExists) {
    //   return left(
    //     new GetPagesErrors.DemoError('some error'),
    //   )
    // }

    // const persistedPage = await this.pageRepository.GetPages(page)

    // return right(Result.ok(persistedPage))
  }
}
