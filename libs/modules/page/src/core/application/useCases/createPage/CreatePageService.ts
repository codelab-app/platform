import { Injectable } from '@nestjs/common'
import { GraphType, Page, VertexType } from '@prisma/client'
import { CreatePageInput } from './CreatePageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class CreatePageService
  implements TransactionalUseCase<CreatePageInput, Page> {
  constructor(private readonly prismaService: PrismaService) {}

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
                    type: VertexType.React_RGL_ResponsiveContainer,
                  },
                ],
              },
            },
          },
        },
      })
    } catch (e) {
      throw new Error(`The app with id ${appId} has not been found`)
    }
  }
}
