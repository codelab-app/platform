import { Page } from '../../../domain/Page'
import { GetPageInput } from './GetPageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class GetPageService
  implements TransactionalUseCase<GetPageInput, Page | null> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ pageId }: GetPageInput): Promise<Page | null> {
    return await this.prismaService.page.findUnique({
      where: {
        id: pageId,
      },
    })
  }
}
