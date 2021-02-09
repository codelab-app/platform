import { Inject, Injectable } from '@nestjs/common'
import { Page } from '@prisma/client'
import { CodelabError } from '../../../../../../../../apps/api/codelab/src/app/CodelabError'
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
    const app = await this.prismaService.app.findFirst({
      where: {
        pages: {
          some: {
            id: pageId,
          },
        },
      },
      include: {
        pages: true,
      },
    })

    console.log(app)

    if (!app) {
      throw new CodelabError('Cannot delete page')
    }

    if (app.pages.length <= 1) {
      throw new CodelabError('Cannot delete last page')
    }

    const where = {
      id: pageId,
    }

    await this.prismaService.cascadeDelete.onDelete({ model: 'Page', where })

    return await this.prismaService.page.delete({
      where,
    })
  }
}
