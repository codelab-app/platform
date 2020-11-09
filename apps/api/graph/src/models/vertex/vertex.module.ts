import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VertexEntity } from './vertex.entity'
import { VertexResolver } from './vertex.resolver'
import { VertexService } from './vertex.service'

@Module({
  imports: [TypeOrmModule.forFeature([VertexEntity])],
  exports: [TypeOrmModule],
  providers: [VertexService, VertexResolver],
})
export class VertexModule {}
