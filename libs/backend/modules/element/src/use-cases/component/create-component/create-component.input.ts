import { Field, InputType } from '@nestjs/graphql'
import { CreateElementInput } from '../../../use-cases/element/create-element'

@InputType()
export class CreateComponentInput extends CreateElementInput {
  @Field(() => String, { nullable: true })
  declare componentFixedId?: string
}
