import { IsEmail, MinLength } from 'class-validator'
import { User } from '../../../domain/user'
import { CreateUserRequest } from './CreateUserRequest'

export class CreateUserDto extends User implements CreateUserRequest {
  @IsEmail()
  declare email: string

  @MinLength(3)
  declare password: string
}
