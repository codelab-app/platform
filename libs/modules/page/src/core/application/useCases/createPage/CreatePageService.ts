import { Page } from '../../../domain/Page'
import { CreatePageInput } from './CreatePageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class CreatePageService
  implements TransactionalUseCase<CreatePageInput, Page> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ appId, ...pageData }: CreatePageInput): Promise<Page> {
    return await this.prismaService.page.create({
      data: {
        ...pageData,
        app: {
          connect: {
            id: appId,
          },
        },
      },
    })
  }
}
