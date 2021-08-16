import { Field, InputType } from '@nestjs/graphql'

/**
 * This defaults to AND
 */
@InputType()
export class WhereUniqueType {
  @Field({ nullable: true })
  declare id?: string

  @Field({ nullable: true })
  declare name?: string
}

@InputType()
export class GetTypeInput {
  @Field(() => WhereUniqueType)
  declare where: WhereUniqueType
}
