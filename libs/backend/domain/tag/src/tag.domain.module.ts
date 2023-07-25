import { Module } from '@nestjs/common'
import { TagRepository } from './repository'

@Module({
  exports: [TagRepository],
  providers: [TagRepository],
})
export class TagDomainModule {}
