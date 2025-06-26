import { ElementDomainModule } from '@codelab/backend-domain-element'
import { PageDomainModule } from '@codelab/backend-domain-page'
import { Module } from '@nestjs/common'

import { DataLoaderService } from './dataloader.service'

@Module({
  imports: [ElementDomainModule, PageDomainModule],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}