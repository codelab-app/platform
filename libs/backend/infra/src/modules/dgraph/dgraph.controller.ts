import { Controller, Post } from '@nestjs/common'
import { DgraphService } from './dgraph.service'

@Controller('dgraph')
export class DgraphController {
  constructor(private readonly dgraphService: DgraphService) {}

  @Post('reset-data')
  async resetData() {
    await this.dgraphService.resetData()
  }

  @Post('update-schema')
  async updateSchema() {
    await this.dgraphService.updateDqlSchema()
  }
}
