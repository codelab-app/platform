import { App } from '../../../domain/App'
import { DeleteAppInput } from './DeleteAppInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class DeleteAppService
  implements TransactionalUseCase<DeleteAppInput, App> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: DeleteAppInput): Promise<App> {
    try {
      return await this.prismaService.app.delete({ where: { id } })
    } catch (e) {
      throw new Error(`The app with id ${id} was not found`)
    }
  }
}
