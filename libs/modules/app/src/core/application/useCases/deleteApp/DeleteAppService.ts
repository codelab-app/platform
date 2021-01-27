import { Inject, Injectable } from '@nestjs/common'
import { App } from '../../../domain/App'
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

  async execute({ id }: DeleteAppInput): Promise<App> {
    try {
      return await this.prismaService.app.delete({ where: { id } })
    } catch (e) {
      throw new Error(`The app with id ${id} was not found`)
    }
  }
}
