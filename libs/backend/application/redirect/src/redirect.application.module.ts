import { RedirectDomainModule } from '@codelab/backend/domain/redirect'
import { Module } from '@nestjs/common'
import { RedirectController } from './redirect.controller'

@Module({
  controllers: [RedirectController],
  imports: [RedirectDomainModule],
})
export class RedirectApplicationModule {}
