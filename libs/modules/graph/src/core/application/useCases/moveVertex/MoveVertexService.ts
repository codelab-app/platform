import { Injectable } from '@nestjs/common'
import { Graph } from '@prisma/client'
import { MoveVertexInput } from './MoveVertexInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export type VertexId = string

@Injectable()
export class MoveVertexService
  implements TransactionalUseCase<MoveVertexInput, Graph | null> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ graphId, type }: MoveVertexInput) {
    return await Promise.resolve(null)
  }
}
