import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { CreateLambdaInput } from './CreateLambdaInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class CreateLambdaService
  implements TransactionalUseCase<CreateLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId, ...request }: CreateLambdaInput) {
    return await this.prismaService.lambda.create({
      data: {
        ...request,
        app: {
          connect: {
            id: appId,
          },
        },
      },
    })
  }
}
