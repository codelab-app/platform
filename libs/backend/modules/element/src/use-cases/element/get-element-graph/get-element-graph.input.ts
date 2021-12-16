import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class WhereUniqueElement {
  @Field({ nullable: true })
  declare id?: string

  @Field({ nullable: true })
  declare fixedId?: string
}

@InputType()
export class GetElementGraphInput {
  @Field(() => WhereUniqueElement)
  declare where: WhereUniqueElement
}
