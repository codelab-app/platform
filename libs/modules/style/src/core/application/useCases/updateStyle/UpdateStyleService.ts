import { Inject, Injectable } from '@nestjs/common'
import { Style } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { UpdateStyleInput } from './UpdateStyleInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UpdateStyleService
  implements TransactionalUseCase<UpdateStyleInput, Style> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ styleId, props, name }: UpdateStyleInput) {
    try {
      return await this.prismaService.style.update({
        where: {
          id: styleId,
        },
        data: {
          props,
          name,
        },
      })
    } catch (e) {
      throw new CodelabPrismaError('Update style failed', e)
    }
  }
}
