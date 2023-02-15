import { ITypeKind } from '@codelab/shared/abstract/core'
import { EntitySchema } from '@codelab/shared/abstract/types'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

/**
 * Entity
 */
const UnionTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.UnionType}`).optional(),
  typesOfUnionType: z.array(EntitySchema),
})

export type IUnionType = z.infer<typeof UnionTypeSchema>

/**
 * Export
 */

const UnionTypeExportSchema = UnionTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.UnionType}`),
})

export type IUnionTypeExport = z.infer<typeof UnionTypeExportSchema>

/**
 * Create
 */
const CreateUnionTypeSchema = UnionTypeSchema.pick({
  __typename: true,
  name: true,
  owner: true,
  typesOfUnionType: true,
})

export type ICreateUnionType = z.infer<typeof CreateUnionTypeSchema>
