import { Injectable } from '@nestjs/common'
import { PrismaService } from '@codelab/backend'

@Injectable()
export class GraphService {
  constructor(private readonly prismaService: PrismaService) {}

  createLayoutGraph() {
    console.log('createLayoutGraph')
    //
  }
}
