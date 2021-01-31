import { Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { CreateAppRequest } from './CreateAppRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class CreateAppService
  implements TransactionalUseCase<CreateAppRequest, App> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ user, ...request }: CreateAppRequest) {
    try {
      return await this.prismaService.app.create({
        data: {
          ...request,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
    } catch (e) {
      throw new Error()
    }
  }
}
