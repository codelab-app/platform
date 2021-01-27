import { Inject, Injectable } from '@nestjs/common'
import { User } from '../../../../presentation/User'
import { DeleteUserInput } from './DeleteUserInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class DeleteUserService
  implements TransactionalUseCase<DeleteUserInput, User> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ email }: DeleteUserInput): Promise<User> {
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
