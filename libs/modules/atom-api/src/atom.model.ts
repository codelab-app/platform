import { Interface, interfaceSchema } from '@codelab/modules/type-api'
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

  @Field(() => Interface)
  /**
   *  Union typed, because it's valid to return just the interface id from a service
   *  the field resolver will get it
   */
  declare propTypes: Interface | Pick<Interface, 'id'>

  constructor({ id, type, label, propTypes }: Atom) {
    this.id = id
    this.type = type
    this.label = label
    this.propTypes = propTypes
  }
}

export const atomSchema = z.object({
  id: z.string(),
  type: AtomType,
  label: z.string(),
  propTypes: interfaceSchema.or(z.object({ id: z.string() })),
})

export const atomTypeSchema = z.object({ type: AtomType })
export const atomsSchema = z.array(atomSchema)
