import { CreateUserInput } from './create-user.input'

export class CreateUserRequest {
  declare input: CreateUserInput

  declare upsert: boolean
}
