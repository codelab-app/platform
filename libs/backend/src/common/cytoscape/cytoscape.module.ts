import { Module } from '@nestjs/common'
import { CytoscapeService } from './cytoscape.service'

@Module({
  providers: [CytoscapeService],
  exports: [CytoscapeService],
})
export class CytoscapeModule {}
