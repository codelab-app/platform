import { Inject, Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { CreatePageService } from '../../../../../../page/src/core/application/useCases/createPage/CreatePageService'
import { CreateAppRequest } from './CreateAppRequest'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

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

      const createdPage = await this.createPageService.execute({
        appId: app.id,
        title: 'Home',
      })

      return { ...app, pages: [createdPage] }
    } catch (e) {
      throw new CodelabPrismaError(
        `Unable to create app for user ${user.email}`,
        e,
      )
    }
  }
}
