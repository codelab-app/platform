import { Inject, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
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

  async execute({ email }: DeleteUserInput) {
    try {
      return await this.prismaService.user.delete({
        where: {
          email,
        },
      })
    } catch (e) {
      throw new CodelabPrismaError(
        `Theres no email ${email} associated with any account`,
        e,
      )
    }
  }
}
