import { Inject, Injectable } from '@nestjs/common'
import { Style } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { CreateStyleInput } from './CreateStyleInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class CreateStyleService
  implements TransactionalUseCase<CreateStyleInput, Style> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ props, appId, name }: CreateStyleInput) {
    try {
      return await this.prismaService.style.create({
        data: {
          app: {
            connect: {
              id: appId,
            },
          },
          props,
          name,
        },
      })
    } catch (e) {
      throw new CodelabPrismaError(
        `The app with id ${appId} has not been found`,
        e,
      )
    }
  }
}
