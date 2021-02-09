import { Inject, Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { DeleteAppInput } from './DeleteAppInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class DeleteAppService
  implements TransactionalUseCase<DeleteAppInput, App> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ id }: DeleteAppInput) {
    const where = { id }

    try {
      await this.prismaService.cascadeDelete.onDelete({ model: 'App', where })

      return await this.prismaService.app.delete({ where })
    } catch (e) {
      throw new CodelabPrismaError(`The app with id ${id} was not found`, e)
    }
  }
}
