import { Inject, Injectable } from '@nestjs/common'
import { Style } from '../../../domain/Style'
import { AssignStyleInput } from './AssignStyleInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class AssignStyleService
  implements TransactionalUseCase<AssignStyleInput, Style> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(input: AssignStyleInput) {
    return (await Promise.resolve({})) as Promise<any>
  }
}
