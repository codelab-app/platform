import { AuthModule } from '@codelab/backend/application/shared'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Auth0Module } from '@codelab/backend/infra/adapter/auth0'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportUserDataHandler } from './use-case'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  exports: [ExportUserDataHandler],
  imports: [UserDomainModule, Auth0Module, CqrsModule, AuthModule],
  providers: [ExportUserDataHandler],
})
export class UserApplicationModule {}
