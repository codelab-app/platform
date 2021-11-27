import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ExportAppInput {
  @Field()
  declare appId: string
}
