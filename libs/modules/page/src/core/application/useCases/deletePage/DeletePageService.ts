import { Page } from '../../../domain/Page'
import { DeletePageInput } from './DeletePageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class DeletePageService
  implements TransactionalUseCase<DeletePageInput, Page> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ pageId }: DeletePageInput): Promise<Page> {
    try {
      return await this.prismaService.page.delete({
        where: {
          id: pageId,
        },
      })
    } catch (e) {
      throw new Error()
    }
  }
}
