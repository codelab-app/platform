import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AtomByPageElementFilter {
  @Field()
  declare pageElementId: string
}

@InputType()
export class GetAtomByInput {
  @Field(() => AtomByPageElementFilter, { nullable: true })
  declare byPageElement?: AtomByPageElementFilter | null
}
