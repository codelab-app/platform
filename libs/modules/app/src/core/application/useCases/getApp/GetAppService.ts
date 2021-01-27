import { Inject, Injectable } from '@nestjs/common'
import { App } from '../../../domain/App'
import { GetAppInput } from './GetAppInput'
import {
  PrismaDITokens,
  PrismaService,
  RequestValidationError,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetAppService
  implements TransactionalUseCase<GetAppInput, App | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId }: GetAppInput): Promise<App | null> {
    try {
      return await this.prismaService.app.findUnique({
        where: {
          id: appId,
        },
      })
    } catch (e) {
      throw new RequestValidationError(`The app ${appId} has not been found`)
    }
  }
}
