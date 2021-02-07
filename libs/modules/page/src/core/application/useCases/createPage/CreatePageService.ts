import { Injectable } from '@nestjs/common'
import { GraphType, Page, VertexType } from '@prisma/client'
import { CreatePageInput } from './CreatePageInput'
import {
  PrismaService,
  TransactionalPrismaUseCase,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class CreatePageService extends TransactionalPrismaUseCase<
  CreatePageInput,
  Page
> {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService)
  }

  prepare({ appId, title }: CreatePageInput) {
    const page = this.prismaService.page.create({
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

    this.operations.push(page)
  }
}
