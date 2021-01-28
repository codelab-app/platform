import { Injectable } from '@nestjs/common'
import { PageDto } from '../../../domain/PageDto'
import { GetPageInput } from './GetPageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class GetPageService
  implements TransactionalUseCase<GetPageInput, PageDto | null> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ pageId }: GetPageInput) {
    try {
      return await this.prismaService.page.findUnique({
        where: {
          id: pageId,
        },
        rejectOnNotFound: true,
      })
    } catch (e) {
      throw new Error(`The page with id ${pageId} has not been found`)
    }
  }
}
