import { Inject, Injectable } from '@nestjs/common'
import { PrismaDITokens } from '../../../../../../../backend/src/infrastructure/persistence/prisma/PrismaDITokens'
import { Page } from '../../../domain/Page'
import { CreatePageInput } from './CreatePageInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class CreatePageService
  implements TransactionalUseCase<CreatePageInput, Page> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ appId, ...pageData }: CreatePageInput): Promise<Page> {
    return await this.prismaService.page.create({
      data: {
        ...pageData,
        app: {
          connect: {
            id: appId,
          },
        },
        // Create a layout graph
        graphs: {
          create: {
            label: 'Layout',
            type: 'Layout',
          },
        },
      },
    })
  }
}
