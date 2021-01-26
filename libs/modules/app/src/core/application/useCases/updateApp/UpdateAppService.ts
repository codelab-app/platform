import { App } from '../../../domain/App'
import { UpdateAppRequest } from './UpdateAppRequest'
import {
  PrismaService,
  RequestValidationError,
  TransactionalUseCase,
} from '@codelab/backend'

export class UpdateAppService
  implements TransactionalUseCase<UpdateAppRequest, App> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ appId, userId, ...appData }: UpdateAppRequest): Promise<App> {
    try {
      const userApp = await this.prismaService.app.findFirst({
        where: {
          id: appId,
          user: {
            id: userId,
          },
        },
      })

      if (!userApp) {
        throw new RequestValidationError()
      }

      return await this.prismaService.app.update({
        where: {
          id: appId,
        },
        data: { ...appData },
      })
    } catch (e) {
      throw new Error()
    }
  }
}
