import { UserDto } from '../../../../presentation/UserDto'
import { ValidateUserRequest } from './ValidateUserRequest'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class ValidateUserService
  implements TransactionalUseCase<ValidateUserRequest, UserDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ userId }: ValidateUserRequest): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
