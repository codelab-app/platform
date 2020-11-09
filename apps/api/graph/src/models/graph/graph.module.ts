import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphEntity } from './graph.entity'
import { GraphResolver } from './graph.resolver'
import { GraphService } from './graph.service'

@Module({
  imports: [TypeOrmModule.forFeature([GraphEntity])],
  providers: [GraphService, GraphResolver],
  exports: [TypeOrmModule],
})
export class GraphModule {}
