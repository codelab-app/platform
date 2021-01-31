import { Injectable } from '@nestjs/common'
import { Page } from '@prisma/client'
import { GetPagesInput } from './GetPagesInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class GetPagesService
  implements TransactionalUseCase<GetPagesInput, Array<Page>> {
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
