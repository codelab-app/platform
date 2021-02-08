import { Inject, Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { CreateAppRequest } from './CreateAppRequest'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'
import { CreatePageService } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageService'

@Injectable()
export class CreateAppService
  implements TransactionalUseCase<CreateAppRequest, App> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    private readonly createPageService: CreatePageService,
  ) {}

  async execute({ user, ...request }: CreateAppRequest) {
    try {
      const app = await this.prismaService.app.create({
        data: {
          ...request,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      await this.createPageService.execute({ appId: app.id, title: 'Home' })

      return app
    } catch (e) {
      throw new Error()
    }
  }
}
