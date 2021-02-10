import { Inject, Injectable } from '@nestjs/common'
import { Style } from '../../../domain/Style'
import { CreateStyleInput } from './CreateStyleInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class CreateStyleService
  implements TransactionalUseCase<CreateStyleInput, Style> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(input: CreateStyleInput) {
    return (await Promise.resolve({})) as Promise<any>
  }
}
