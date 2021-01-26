import { AppDto } from '../AppDto'
import { CreateAppRequest } from './CreateAppRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class CreateAppService
  implements TransactionalUseCase<CreateAppRequest, AppDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ user, ...request }: CreateAppRequest): Promise<AppDto> {
    try {
      const app = await this.prismaService.app.create({
        // select: {
        //   user: {
        //     select: {
        //       id: true,
        //       email: true,
        //     },
        //   },
        // },
        data: {
          ...request,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      return app
    } catch (e) {
      throw new Error()
    }
  }
}
