import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { AuthModule } from '@codelab/backend/application/shared'
import { AdminDomainModule } from '@codelab/backend/domain/admin'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportUserDataHandler } from './use-case'
import { UserApplicationController } from './user.application.controller'

@Module({
  controllers: [UserApplicationController],
  exports: [ExportUserDataHandler, UserApplicationService],
  imports: [
    UserDomainModule,
    AuthDomainModule,
    TypeDomainModule,
    AtomDomainModule,
    AdminDomainModule,
    AtomApplicationModule,
    CqrsModule,
    AuthModule,
  ],
  providers: [ExportUserDataHandler, UserApplicationService],
})
export class UserApplicationModule {}
