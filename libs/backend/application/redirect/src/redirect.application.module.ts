import { RedirectDomainModule } from '@codelab/backend/domain/redirect'
import { Module } from '@nestjs/common'
import { CanActivateController } from './redirect.controller'

@Module({
  controllers: [CanActivateController],
  imports: [RedirectDomainModule],
})
export class RedirectApplicationModule {}
