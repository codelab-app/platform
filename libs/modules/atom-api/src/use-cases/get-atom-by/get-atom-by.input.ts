import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AtomByElementFilter {
  @Field()
  declare elementId: string
}

@InputType()
export class GetAtomByInput {
  @Field(() => AtomByElementFilter, { nullable: true })
  declare byElement?: AtomByElementFilter | null
}
