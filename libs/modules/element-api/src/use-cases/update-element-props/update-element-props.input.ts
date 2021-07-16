import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateElementPropsInput {
  @Field()
  declare props: string

  @Field()
  declare elementId: string
}
