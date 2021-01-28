import { Injectable } from '@nestjs/common'
import { AppDto } from '../../../domain/AppDto'
import { GetAppsRequest } from './GetAppsRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class GetAppsService
  implements TransactionalUseCase<GetAppsRequest, Array<AppDto>> {
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
