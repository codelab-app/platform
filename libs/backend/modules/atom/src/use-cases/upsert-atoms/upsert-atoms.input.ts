import { Field, InputType } from '@nestjs/graphql'
import { CreateAtomInput } from '../create-atom'

@InputType()
export class UpsertAtomInput extends CreateAtomInput {
  @Field({ nullable: true })
  id?: string
}

@InputType()
export class UpsertAtomsInput {
  @Field(() => [UpsertAtomInput])
  declare atoms: Array<UpsertAtomInput>
}
