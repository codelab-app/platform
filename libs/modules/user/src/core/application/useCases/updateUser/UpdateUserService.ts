import { Inject, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
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

  async execute({ id, ...data }: UpdateUserInput) {
    try {
      return await this.prismaService.user.update({
        where: {
          id,
        },
        data,
      })
    } catch (e) {
      throw new CodelabPrismaError(
        `Theres no email ${data.email} associated with any account`,
        e,
      )
    }
  }
}
