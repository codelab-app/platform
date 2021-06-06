import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Unit, unitSchema } from './unit.model'

/**
 * Handles specifying the type in multiple different units
 */
@ObjectType()
export class UnitType {
  @Field(() => ID)
  declare id: string

  @Field(() => [Unit])
  declare allowedUnits: Array<Unit>
}

export const unitTypeSchema = z.object({
  id: z.string(),
  allowedUnits: unitSchema.array(),
})
