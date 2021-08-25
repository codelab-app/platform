import { Field, InputType } from '@nestjs/graphql'

// @InputType()
// export class ImportApiInput {
//   @Field(() => ImportTypeGraphInput)
//   declare api: ImportTypeGraphInput
// }
//
// @InputType()
// export class ImportAtom extends IntersectionType(
//   CreateAtomInput,
//   ImportApiInput,
// ) {}

@InputType()
export class ImportAtomsInput {
  @Field()
  declare payload: string
}
