import { SharedDomainModule } from '@codelab/backend/domain/shared'
import { Module } from '@nestjs/common'
import { ElementRepository } from './repository'

@Module({
  exports: [ElementRepository],
  imports: [SharedDomainModule],
  providers: [ElementRepository],
})
export class ElementDomainModule {}