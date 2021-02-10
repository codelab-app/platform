import { Inject, Injectable } from '@nestjs/common'
import { Style } from '../../../domain/Style'
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

  async execute(input: DeleteStyleInput) {
    return (await Promise.resolve({})) as Promise<any>
  }
}
