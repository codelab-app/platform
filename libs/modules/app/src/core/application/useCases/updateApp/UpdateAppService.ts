import { Inject, Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { CodelabError } from '../../../../../../../../apps/api/codelab/src/app/CodelabError'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { UpdateAppRequest } from './UpdateAppRequest'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UpdateAppService
  implements TransactionalUseCase<UpdateAppRequest, App> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId, user, ...appData }: UpdateAppRequest) {
    try {
      const userApp = await this.prismaService.app.findFirst({
        where: {
          id: appId,
          user: {
            id: user.id,
          },
        },
      })

      if (!userApp) {
        throw new CodelabError(`App for user ${user.email} was not found`)
      }

      return await this.prismaService.app.update({
        where: {
          id: appId,
        },
        data: { ...appData },
      })
    } catch (e) {
      throw new CodelabPrismaError(
        `Unable to create app for user ${user.email}`,
        e,
      )
    }
  }
}
