import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.schema'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto)

    return createdUser.save()
  }

  async all(): Promise<Array<User>> {
    return this.UserModel.find().exec()
  }
}
