import { AtomType } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType({ description: 'Provide at most 1 filter' })
export class AtomsWhereInput {
  @Field(() => [String], { nullable: true })
  declare ids?: Array<string>

  @Field(() => [AtomType], { nullable: true })
  declare types?: Array<AtomType>
}

@InputType()
export class GetAtomsInput {
  @Field(() => AtomsWhereInput, { nullable: true })
  declare where?: AtomsWhereInput
}
