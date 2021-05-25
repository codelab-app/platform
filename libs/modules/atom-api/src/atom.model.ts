import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { z } from 'zod'
import { AtomType } from './atom-type.model'

registerEnumType(AtomType, {
  name: 'AtomType',
})

@ObjectType()
export class Atom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomType)
  declare type: AtomType

  @Field()
  declare label: string
}

export const atomSchema = z.object({
  id: z.string(),
  type: AtomType,
  label: z.string(),
})

export const atomsSchema = z.array(atomSchema)
