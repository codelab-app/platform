import { Inject, Injectable } from '@nestjs/common'
import { Style } from '@prisma/client'
import { CodelabError } from '../../../../../../../../apps/api/codelab/src/app/CodelabError'
import { DeleteStyleInput } from './DeleteStyleInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class DeleteStyleService
  implements TransactionalUseCase<DeleteStyleInput, Style> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ styleId }: DeleteStyleInput) {
    const app = await this.prismaService.app.findFirst({
      where: {
        styles: {
          some: {
            id: styleId,
          },
        },
      },
      include: {
        pages: true,
      },
    })

    if (!app) {
      throw new CodelabError('Cannot delete style')
    }

    const where = {
      id: styleId,
    }

    await this.prismaService.cascadeDelete.onDelete({ model: 'Style', where })

    return await this.prismaService.style.delete({
      where,
    })
  }
}
