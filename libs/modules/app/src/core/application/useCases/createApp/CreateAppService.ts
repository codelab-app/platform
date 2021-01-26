import { App } from '../../../domain/App'
import { CreateAppRequest } from './CreateAppRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class CreateAppService
  implements TransactionalUseCase<CreateAppRequest, App> {
  constructor(private readonly prismaService: PrismaService) {}

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
