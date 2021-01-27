import { Inject, Injectable } from '@nestjs/common'
import { App } from '../../../domain/App'
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

  async execute({ user }: GetAppsRequest): Promise<Array<App>> {
    return await this.prismaService.app.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    })
  }
}
