import { Field, InputType, OmitType } from '@nestjs/graphql'
import { CreateUserInput } from '../create-user'

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, ['email']) {
  @Field()
  declare id: string
}
