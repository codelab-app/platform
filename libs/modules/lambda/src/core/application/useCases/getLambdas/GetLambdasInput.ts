import { InputType } from '@nestjs/graphql'

@InputType()
export class GetLambdasInput {
  declare appId: string
}
