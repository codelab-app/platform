import { ImportTypeGraphInput } from '@codelab/backend/modules/type'
import { Field, InputType, IntersectionType } from '@nestjs/graphql'
import { CreateAtomInput } from '../create-atom'

@InputType()
export class ImportApiInput {
  @Field(() => ImportTypeGraphInput)
  declare api: ImportTypeGraphInput
}

@InputType()
export class ImportAtom extends IntersectionType(
  CreateAtomInput,
  ImportApiInput,
) {}

@InputType()
export class ImportAtomsInput {
  @Field(() => [ImportAtom])
  declare atoms: Array<ImportAtom>
}
