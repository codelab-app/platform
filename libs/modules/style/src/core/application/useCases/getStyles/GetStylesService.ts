import { Inject, Injectable } from '@nestjs/common'
import { Style } from '@prisma/client'
import { GetStylesInput } from './GetStylesInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetStylesService
  implements TransactionalUseCase<GetStylesInput, Array<Style>> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId }: GetStylesInput) {
    return await this.prismaService.style.findMany({
      where: {
        app: {
          id: appId,
        },
      },
    })
  }
}
