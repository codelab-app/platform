import { Module } from '@nestjs/common'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  exports: [],
  providers: [],
})
export class UserModule {}
