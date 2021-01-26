import { App } from '../../../domain/App'
import { GetAppInput } from './GetAppInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class GetAppService
  implements TransactionalUseCase<GetAppInput, App | null> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ appId }: GetAppInput): Promise<App | null> {
    return await this.prismaService.app.findUnique({
      where: {
        id: appId,
      },
    })
  }
}
