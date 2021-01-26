import { User } from '../../../../presentation/User'
import { ValidateUserRequest } from './ValidateUserRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class ValidateUserService
  implements TransactionalUseCase<ValidateUserRequest, User> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ userId }: ValidateUserRequest): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
