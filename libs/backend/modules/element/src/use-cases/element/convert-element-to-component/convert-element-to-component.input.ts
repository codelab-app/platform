import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ConvertElementToComponentInput {
  @Field()
  declare elementId: string
}
