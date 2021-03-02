import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { GetLambdasInput } from './GetLambdasInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetLambdasService
  implements TransactionalUseCase<GetLambdasInput, Array<Lambda>> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId }: GetLambdasInput) {
    return await this.prismaService.lambda.findMany({
      where: {
        app: {
          id: appId,
        },
      },
    })
  }
}
