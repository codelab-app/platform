import { Inject, Injectable } from '@nestjs/common'
import { App } from '../../../domain/App'
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
  ) {}

  async execute({ user, ...request }: CreateAppRequest): Promise<App> {
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
