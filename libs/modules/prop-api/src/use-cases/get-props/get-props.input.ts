import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PropsByAtomFilter {
  @Field()
  declare atomId: string
}

@InputType()
export class GetPropsInput {
  @Field(() => PropsByAtomFilter, { nullable: true })
  declare byAtom?: PropsByAtomFilter | null
}
