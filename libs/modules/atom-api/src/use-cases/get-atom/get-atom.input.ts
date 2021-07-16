import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AtomByElement {
  @Field()
  declare elementId: string
}

@InputType()
export class AtomById {
  @Field()
  declare atomId: string
}

@InputType()
export class GetAtomInput {
  @Field(() => AtomByElement, { nullable: true })
  declare byElement?: AtomByElement | null

  @Field(() => AtomById, { nullable: true })
  declare byId?: AtomById | null
}
