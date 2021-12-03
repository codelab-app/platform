import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateElementPropsInput {
  @Field()
  declare data: string

  @Field()
  declare propsId: string

  @Field()
  declare elementId: string
}
