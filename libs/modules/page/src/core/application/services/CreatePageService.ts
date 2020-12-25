import { PageRepositoryPort } from '../../adapters/PageRepositoryPort'
import { CreatePageRequest } from '../useCases/createPage/CreatePageRequest'
import { CreatePageResponse } from '../useCases/createPage/CreatePageResponse'
import { CreatePageUseCase } from '../useCases/createPage/CreatePageUseCase'

export class CreatePageService implements CreatePageUseCase {
  constructor(private readonly pageRepository: PageRepositoryPort) {}

  async execute(request: CreatePageRequest): Promise<CreatePageResponse> {
    // const page = Page.create(request)
    // const pageAlreadyExists = await this.pageRepository.exists({
    //   email: user.email.toString(),
    // })
    // if (pageAlreadyExists) {
    //   return left(
    //     new CreatePageErrors.DemoError('some error'),
    //   )
    // }
    // const persistedPage = await this.pageRepository.createPage(page)
    // return right(Result.ok(persistedPage))
  }
}
