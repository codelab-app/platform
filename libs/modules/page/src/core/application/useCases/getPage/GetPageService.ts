import { Inject, Injectable } from '@nestjs/common'
import { Page } from '../../../domain/Page'
import { GetPageInput } from './GetPageInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetPageService
  implements TransactionalUseCase<GetPageInput, Page | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ pageId }: GetPageInput): Promise<Page> {
    try {
      return (await this.prismaService.page.findUnique({
        where: {
          id: pageId,
        },
        rejectOnNotFound: true,
      })) as Page
    } catch (e) {
      throw new Error(`The page with id ${pageId} has not been found`)
    }
  }
}
