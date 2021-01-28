import { Injectable } from '@nestjs/common'
import { AppDto } from '../../../domain/AppDto'
import { CreateAppRequest } from './CreateAppRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class CreateAppService
  implements TransactionalUseCase<CreateAppRequest, AppDto> {
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
