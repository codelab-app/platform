import { Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { GetAppsRequest } from './GetAppsRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class GetAppsService
  implements TransactionalUseCase<GetAppsRequest, Array<App>> {
  constructor(private readonly prismaService: PrismaService) {}

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
