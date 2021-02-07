import { Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { CreateAppRequest } from './CreateAppRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'
import { CreatePageService } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageService'

@Injectable()
export class CreateAppService
  implements TransactionalUseCase<CreateAppRequest, App> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly createPageService: CreatePageService,
  ) {}

  async execute({ user, ...request }: CreateAppRequest) {
    try {
      const app = this.prismaService.app.create({
        data: {
          ...request,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      this.createPageService.prepare({ appId: (await app).id, title: 'Home' })

      return (
        await this.prismaService.$transaction([
          app,
          this.createPageService.operations,
        ])
      )[0]
    } catch (e) {
      throw new Error()
    }
  }
}
