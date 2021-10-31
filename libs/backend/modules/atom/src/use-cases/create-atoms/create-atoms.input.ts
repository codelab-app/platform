import { Field, InputType } from '@nestjs/graphql'
import { CreateAtomInput } from '../create-atom'

@InputType()
export class CreateAtomsInput {
  @Field(() => [CreateAtomInput])
  declare atoms: Array<CreateAtomInput>
}
