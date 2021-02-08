import { Inject, Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { UpdateAppRequest } from './UpdateAppRequest'
import {
  PrismaDITokens,
  PrismaService,
  RequestValidationError,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UpdateAppService
  implements TransactionalUseCase<UpdateAppRequest, App> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId, userId, ...appData }: UpdateAppRequest) {
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
      throw new RequestValidationError()
    }
  }
}
