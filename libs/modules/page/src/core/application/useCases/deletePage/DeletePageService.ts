import { Inject, Injectable } from '@nestjs/common'
import { Page } from '@prisma/client'
import { DeletePageInput } from './DeletePageInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class DeletePageService
  implements TransactionalUseCase<DeletePageInput, Page> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ pageId }: DeletePageInput) {
    try {
      const app = await this.prismaService.app.findFirst({
        where: {
          pages: {
            some: {
              id: pageId,
            },
          },
        },
      })

      console.log(app)

      if (!app) {
        throw new Error('')
      }

      const pages = await this.prismaService.page.findMany({
        where: {
          appId: app.id,
        },
      })

      if (pages.length <= 1) {
        throw new Error('Cannot delete last page')
      }

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
