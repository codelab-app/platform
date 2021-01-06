import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetAppsRequest {
  @Field()
  declare userId: string
}
