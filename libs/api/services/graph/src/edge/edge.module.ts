import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EdgeEntity } from './edge.entity'
import { EdgeResolver } from './edge.resolver'
import { EdgeService } from './edge.service'

@Module({
  imports: [TypeOrmModule.forFeature([EdgeEntity])],
  exports: [TypeOrmModule],
  providers: [EdgeService, EdgeResolver],
})
export class EdgeModule {}
