import { PageRepositoryPort } from '../../../adapters/PageRepositoryPort'
import { GetPagesRequest } from './GetPagesRequest'
import { GetPagesResponse } from './GetPagesResponse'
import { GetPagesUseCase } from './GetPagesUseCase'

export class GetPagesService implements GetPagesUseCase {
  constructor(private readonly pageRepository: PageRepositoryPort) {}

  async execute({ appId }: GetPagesRequest): Promise<GetPagesResponse> {
    const foundApps = await this.pageRepository.findMany({
      appId,
      // relations: ['app'],
      // where: {
      //   app: {
      //     id: appId,
      //   },
      // },
    })
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
    return Promise.reject()
  }
}
