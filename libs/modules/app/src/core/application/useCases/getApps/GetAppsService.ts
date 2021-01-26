import { App } from '../../../domain/App'
import { GetAppsRequest } from './GetAppsRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class GetAppsService
  implements TransactionalUseCase<GetAppsRequest, Array<App>> {
  constructor(private readonly prismaService: PrismaService) {}

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
