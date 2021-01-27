import { Inject, Injectable } from '@nestjs/common'
import { User } from '../../../../presentation/User'
import { UpdateUserInput } from './UpdateUserInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UpdateUserService
  implements TransactionalUseCase<UpdateUserInput, User> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

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
