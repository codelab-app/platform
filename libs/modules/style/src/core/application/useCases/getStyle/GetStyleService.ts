import { Inject, Injectable } from '@nestjs/common'
import { Style } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { GetStyleInput } from './GetStyleInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetStyleService
  implements TransactionalUseCase<GetStyleInput, Style | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ styleId }: GetStyleInput) {
    try {
      return await this.prismaService.style.findUnique({
        where: {
          id: styleId,
        },
        rejectOnNotFound: true,
      })
    } catch (e) {
      throw new CodelabPrismaError(
        `The style with id ${styleId} has not been found`,
        e,
      )
    }
  }
}
