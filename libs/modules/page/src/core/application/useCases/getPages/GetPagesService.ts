import { Injectable } from '@nestjs/common'
import { PageDto } from '../../../domain/PageDto'
import { GetPagesInput } from './GetPagesInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class GetPagesService
  implements TransactionalUseCase<GetPagesInput, Array<PageDto>> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ appId }: GetPagesInput) {
    return await this.prismaService.page.findMany({
      where: {
        app: {
          id: appId,
        },
      },
    })
  }
}
