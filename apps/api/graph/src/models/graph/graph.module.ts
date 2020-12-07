import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CytoscapeStorybookService } from './cytoscape-storybook.service'
import { GraphController } from './graph.controller'
import { GraphEntity } from './graph.entity'
import { GraphResolver } from './graph.resolver'
import { GraphService } from './graph.service'

@Module({
  imports: [TypeOrmModule.forFeature([GraphEntity])],
  providers: [GraphService, GraphResolver, CytoscapeStorybookService],
  exports: [TypeOrmModule],
  controllers: [GraphController],
})
export class GraphModule {}
