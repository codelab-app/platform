import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { Module } from '@nestjs/common'
import { ElementApplicationController } from './element.application.controller'
import { ElementApplicationService } from './element.application.service'

/**
 * Created this to seed Cypress data for create element tree, but trying out data seeding through mobx as well
 */
@Module({
  controllers: [ElementApplicationController],
  exports: [ElementApplicationService],
  imports: [ElementDomainModule, AtomDomainModule, PropDomainModule],
  providers: [ElementApplicationService],
})
export class ElementApplicationModule {}
