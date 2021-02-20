import { Inject, Injectable } from '@nestjs/common'
import { GraphType, Page, VertexType } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { CreatePageInput } from './CreatePageInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class CreatePageService
  implements TransactionalUseCase<CreatePageInput, Page> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId, title }: CreatePageInput) {
    try {
      return await this.prismaService.page.create({
        data: {
          title,
          app: {
            connect: {
              id: appId,
            },
          },
          graphs: {
            create: {
              label: 'Layout',
              type: GraphType.Layout,
              vertices: {
                create: [
                  {
                    type: VertexType.React_Page_Container,
                  },
                ],
              },
            },
          },
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
