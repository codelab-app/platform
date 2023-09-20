import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { AuthModule } from '@codelab/backend/application/shared'
import { TypeApplicationModule } from '@codelab/backend/application/type'
import { AdminDomainModule } from '@codelab/backend/domain/admin'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Auth0Module } from '@codelab/backend/infra/adapter/auth0'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportUserDataHandler } from './use-case'
import { UserApplicationService } from './user.application.service'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  exports: [ExportUserDataHandler],
  imports: [
    UserDomainModule,
    TypeDomainModule,
    AtomDomainModule,
    AdminDomainModule,
    AtomApplicationModule,
    Auth0Module,
    CqrsModule,
    AuthModule,
  ],
  providers: [ExportUserDataHandler, UserApplicationService],
})
export class UserApplicationModule {}
