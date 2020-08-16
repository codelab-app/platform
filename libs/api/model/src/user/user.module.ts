import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, User } from './user.schema'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
