import { App } from '../../../domain/app'
import { DeleteAppInput } from './DeleteAppInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class DeleteAppService
  implements TransactionalUseCase<DeleteAppInput, App> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: DeleteAppInput): Promise<App> {
    try {
      const app = await this.prismaService.app.delete({ where: { id } })

      return App.hydrate(app)
    } catch (e) {
      throw new Error(`The app with id ${id} was not found`)
    }
  }
}
