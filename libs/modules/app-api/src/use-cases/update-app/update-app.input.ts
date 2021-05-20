import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateAppInput } from '../create-app'

@InputType()
export class UpdateAppInput extends PartialType(CreateAppInput) {
  @Field()
  declare appId: string
}
