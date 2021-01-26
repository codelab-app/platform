import { UserDto } from '../../../../presentation/UserDto'
import { UpdateUserInput } from './UpdateUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class UpdateUserService
  implements TransactionalUseCase<UpdateUserInput, UserDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id, ...data }: UpdateUserInput): Promise<UserDto> {
    try {
      return this.prismaService.user.update({
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
