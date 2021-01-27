import { Inject, Injectable } from '@nestjs/common'
import { PrismaDITokens } from '../../../../../../../backend/src/infrastructure/persistence/prisma/PrismaDITokens'
import { Page } from '../../../domain/Page'
import { CreatePageInput } from './CreatePageInput'
import { NodeType, PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class CreatePageService
  implements TransactionalUseCase<CreatePageInput, Page> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId, ...pageData }: CreatePageInput): Promise<Page> {
    try {
      return await this.prismaService.page.create({
        data: {
          ...pageData,
          app: {
            connect: {
              id: appId,
            },
          },
          graphs: {
            create: {
              label: 'Layout',
              type: 'Layout',
              vertices: {
                create: [
                  {
                    type: NodeType.React_Grid_Layout_Container,
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
