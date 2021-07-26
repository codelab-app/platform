import { InputType } from '@nestjs/graphql'

@InputType()
export class GetLambdasRequest {
  declare ownerId: string
}
