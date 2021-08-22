import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AtomsWhereInput {
  @Field(() => [String])
  declare ids?: Array<string>
}

@InputType()
export class GetAtomsInput {
  @Field(() => AtomsWhereInput, { nullable: true })
  declare where?: AtomsWhereInput
}
