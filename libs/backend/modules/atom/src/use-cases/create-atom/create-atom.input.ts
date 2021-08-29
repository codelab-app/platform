import { Field, InputType } from '@nestjs/graphql'
import { AtomType } from '../../domain/atom-type.model'

@InputType()
export class CreateAtomInput {
  @Field()
  declare name: string

  @Field(() => AtomType)
  declare type: AtomType

  // This is the interfaceId used at the services level. Not required for frontend because frontend creation never has a exiatom-seedersting api
  declare api?: string
}
