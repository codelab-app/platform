import { ElementRepository } from '@codelab/backend-domain-element'
import { SharedDomainModule } from '@codelab/backend-domain-shared-modules'
import { Module } from '@nestjs/common'

import { ComponentRepository } from './repository'
import { ComponentElementsService } from './services'

@Module({
  exports: [ComponentElementsService, ComponentRepository],
  imports: [SharedDomainModule],
  providers: [ComponentElementsService, ComponentRepository, ElementRepository],
})
export class ComponentDomainModule {}
