import { Inject, Injectable } from '@nestjs/common'
import { Page } from '@prisma/client'
import { GetPagesInput } from './GetPagesInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetPagesService
  implements TransactionalUseCase<GetPagesInput, Array<Page>> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

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
