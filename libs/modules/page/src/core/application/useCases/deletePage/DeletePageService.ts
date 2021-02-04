import { Injectable } from '@nestjs/common'
import { Page } from '@prisma/client'
import { DeletePageInput } from './DeletePageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class DeletePageService
  implements TransactionalUseCase<DeletePageInput, Page> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ pageId }: DeletePageInput) {
    try {
      const pages = await this.prismaService.app.findMany({
        select: {
          pages: true,
        },
        where: {
          pages: {
            some: {
              id: pageId,
            },
          },
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
