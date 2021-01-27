import { Inject, Injectable } from '@nestjs/common'
import { PrismaDITokens, PrismaService } from '@codelab/backend'

@Injectable()
export class GraphService {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  createLayoutGraph() {
    console.log('createLayoutGraph')
    //
  }
}
