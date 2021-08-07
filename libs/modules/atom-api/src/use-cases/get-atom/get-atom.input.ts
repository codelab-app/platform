import { Field, InputType } from '@nestjs/graphql'
import { AtomTypeEnum } from '../../infrastructure'

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
export class AtomByType {
  @Field(() => AtomTypeEnum)
  declare atomType: AtomTypeEnum
}

@InputType()
export class GetAtomInput {
  @Field(() => AtomByElement, { nullable: true })
  declare byElement?: AtomByElement | null

  @Field(() => AtomById, { nullable: true })
  declare byId?: AtomById | null

  @Field(() => AtomByType, { nullable: true })
  declare byType?: AtomByType | null
}
