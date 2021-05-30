import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { z } from 'zod'
import { AtomType, AtomTypeEnum } from './atom-type.model'

registerEnumType(AtomTypeEnum, {
  name: 'AtomType',
})

@ObjectType()
export class Atom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomTypeEnum)
  declare type: AtomType

  @Field()
  declare label: string

  constructor({ id, type, label }: Atom) {
    this.id = id
    this.type = type
    this.label = label
  }
}

export const atomSchema = z.object({
  id: z.string(),
  type: AtomType,
  label: z.string(),
})

export const atomTypeSchema = z.object({ type: AtomType })

export const atomsSchema = z.array(atomSchema)
