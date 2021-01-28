import { Injectable } from '@nestjs/common'
import { PageDto } from '../../../domain/PageDto'
import { DeletePageInput } from './DeletePageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class DeletePageService
  implements TransactionalUseCase<DeletePageInput, PageDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ pageId }: DeletePageInput) {
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
