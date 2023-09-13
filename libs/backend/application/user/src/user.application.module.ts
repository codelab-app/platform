import { AuthModule } from '@codelab/backend/application/service'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportUserDataHandler } from './use-case'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  exports: [ExportUserDataHandler],
  imports: [UserDomainModule, CqrsModule, AuthModule],
  providers: [ExportUserDataHandler],
})
export class UserApplicationModule {}
