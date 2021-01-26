import { User } from '../../../domain/user'
import { DeleteUserInput } from './DeleteUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class DeleteUserService
  implements TransactionalUseCase<DeleteUserInput, User> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ email }: DeleteUserInput): Promise<User> {
    try {
      const user = await this.prismaService.user.delete({
        where: {
          email,
        },
      })

      return User.hydrate(user)
    } catch (e) {
      throw new Error(`Theres no email ${email} associated with any account`)
    }
  }
}
