import { Inject, Injectable } from '@nestjs/common'
import { App } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { GetAppInput } from './GetAppInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetAppService
  implements TransactionalUseCase<GetAppInput, App | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId }: GetAppInput) {
    try {
      return await this.prismaService.app.findUnique({
        where: {
          id: appId,
        },
        rejectOnNotFound: true,
      })
    } catch (e) {
      throw new CodelabPrismaError(
        `The app with id ${appId} has not been found`,
        e,
      )
    }
  }
}
