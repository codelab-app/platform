import { User } from '../../../domain/user'
import { UpdateUserInput } from './UpdateUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class UpdateUserService
  implements TransactionalUseCase<UpdateUserInput, User> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id, ...data }: UpdateUserInput): Promise<User> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          id,
        },
        data,
      })

      return User.hydrate(user)
    } catch (e) {
      throw new Error(
        `Theres no email ${data.email} associated with any account`,
      )
    }
  }
}
