import { ITypeGraphWhereUnique } from '@codelab/backend/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType({
  description: `Provide exactly 1 field`,
})
export class WhereUniqueTypeGraph implements ITypeGraphWhereUnique {
  @Field({ nullable: true })
  declare id?: string

  @Field({ nullable: true })
  declare name?: string

  @Field({ nullable: true })
  declare atomId?: string
}

@InputType()
export class GetTypeGraphInput {
  @Field(() => WhereUniqueTypeGraph)
  declare where: WhereUniqueTypeGraph
}
