import { ElementDomainModule } from '@codelab/backend-domain-element'
import { Module } from '@nestjs/common'

import { DataLoaderService } from './dataloader.service'

@Module({
  imports: [ElementDomainModule],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}