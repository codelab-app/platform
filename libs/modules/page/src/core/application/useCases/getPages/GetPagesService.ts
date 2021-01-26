import { Page } from '../../../domain/Page'
import { GetPagesInput } from './GetPagesInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class GetPagesService
  implements TransactionalUseCase<GetPagesInput, Array<Page>> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ appId }: GetPagesInput): Promise<Array<Page>> {
    return await this.prismaService.page.findMany({
      where: {
        app: {
          id: appId,
        },
      },
    })
  }
}
