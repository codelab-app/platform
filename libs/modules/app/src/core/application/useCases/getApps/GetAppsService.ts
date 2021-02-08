import { Inject, Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { GetAppsRequest } from './GetAppsRequest'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetAppsService
  implements TransactionalUseCase<GetAppsRequest, Array<App>> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ user }: GetAppsRequest) {
    return await this.prismaService.app.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    })
  }
}
