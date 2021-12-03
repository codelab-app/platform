import { Field, InputType } from '@nestjs/graphql'

@InputType({
  description: `Provide exactly 1 field`,
})
export class WhereUniqueType {
  @Field({ nullable: true })
  declare id?: string

  @Field({ nullable: true })
  declare name?: string

  @Field({ nullable: true })
  declare atomId?: string

  @Field({ nullable: true })
  declare enumTypeValueId?: string
}

@InputType()
export class GetTypeInput {
  @Field(() => WhereUniqueType)
  declare where: WhereUniqueType
}
