import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TagWhereUniqueInput {
  @Field({ nullable: true })
  declare id?: string
}

@InputType()
export class GetTagGraphInput {
  @Field(() => TagWhereUniqueInput)
  declare where: TagWhereUniqueInput
}

/**
 * Input for Dgraph queries
 */
export interface GetTagGraphById {
  $rootVertex: string
}
