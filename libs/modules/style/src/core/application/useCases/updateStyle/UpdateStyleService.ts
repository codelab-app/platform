import { Inject, Injectable } from '@nestjs/common'
import { Style } from '../../../domain/Style'
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

  async execute(input: UpdateStyleInput) {
    return (await Promise.resolve({})) as Promise<any>
  }
}
