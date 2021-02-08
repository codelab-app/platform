import { Inject, Injectable } from '@nestjs/common'
import { Page } from '@prisma/client'
import { UpdatePageInput } from './UpdatePageInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UpdatePageService
  implements TransactionalUseCase<UpdatePageInput, Page> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ pageId, title }: UpdatePageInput) {
    try {
      return await this.prismaService.page.update({
        where: {
          id: pageId,
        },
        data: {
          title,
        },
      })
    } catch (e) {
      throw new Error('Update page failed')
    }
  }
}
