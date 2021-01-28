import { Injectable } from '@nestjs/common'
import { User } from '../../../domain/User'
import { UpdateUserInput } from './UpdateUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class UpdateUserService
  implements TransactionalUseCase<UpdateUserInput, User> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id, ...data }: UpdateUserInput): Promise<User> {
    try {
      return await this.prismaService.user.update({
        where: {
          id,
        },
        data,
      })
    } catch (e) {
      throw new Error(
        `Theres no email ${data.email} associated with any account`,
      )
    }
  }
}
