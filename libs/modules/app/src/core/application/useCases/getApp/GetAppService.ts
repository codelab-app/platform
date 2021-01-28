import { Injectable } from '@nestjs/common'
import { AppDto } from '../../../domain/AppDto'
import { GetAppInput } from './GetAppInput'
import {
  PrismaService,
  RequestValidationError,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetAppService
  implements TransactionalUseCase<GetAppInput, AppDto | null> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ appId }: GetAppInput) {
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
