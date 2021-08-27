import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ImportApiInput {
  @Field()
  declare payload: string
}
