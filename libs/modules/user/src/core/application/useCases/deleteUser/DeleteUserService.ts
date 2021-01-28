import { Injectable } from '@nestjs/common'
import { UserDto } from '../../../domain/UserDto'
import { DeleteUserInput } from './DeleteUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class DeleteUserService
  implements TransactionalUseCase<DeleteUserInput, UserDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ email }: DeleteUserInput) {
    try {
      return await this.prismaService.user.delete({
        where: {
          email,
        },
      })
    } catch (e) {
      throw new Error(`Theres no email ${email} associated with any account`)
    }
  }
}
