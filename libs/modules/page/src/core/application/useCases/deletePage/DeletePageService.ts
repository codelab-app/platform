import { Inject, Injectable } from '@nestjs/common'
import { PrismaDITokens } from '../../../../../../../backend/src/infrastructure/persistence/prisma/PrismaDITokens'
import { Page } from '../../../domain/Page'
import { DeletePageInput } from './DeletePageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class DeletePageService
  implements TransactionalUseCase<DeletePageInput, Page> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ pageId }: DeletePageInput): Promise<Page> {
    try {
      return await this.prismaService.page.delete({
        where: {
          id: pageId,
        },
      })
    } catch (e) {
      throw new Error(`The page with id ${pageId} was not found`)
    }
  }
}
