import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteAppRequest {
  @Field()
  declare appId: string
}
