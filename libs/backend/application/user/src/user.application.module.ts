import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { PreferenceDomainModule } from '@codelab/backend/domain/preference'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportUserDataHandler } from './use-case'
import { UserApplicationController } from './user.application.controller'

@Module({
  controllers: [UserApplicationController],
  exports: [],
  imports: [
    UserDomainModule,
    AuthDomainModule,
    TypeDomainModule,
    AtomDomainModule,
    PreferenceDomainModule,
    AtomApplicationModule,
    CqrsModule,
  ],
  providers: [ExportUserDataHandler],
})
export class UserApplicationModule {}
