import { Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { z } from 'zod'
import { EdgeSchema } from '../../graph'
import type { IAnyType } from '../types/type.interface'

const FieldDataSchema = z.object({
  name: z.string().optional().nullable(),
  key: z.string(),
  description: z.string().optional().nullable(),
})

export const FieldSchema = z.intersection(EdgeSchema, FieldDataSchema)

/**
 * Type edge can be:
 * - Interface -> Field relation - IField is used then
 * - Array -> Array Item Type relation - IEdge
 * - Union -> Union Item Type relation - IEdge
 */
export const TypeEdgeSchema = z.union([FieldSchema, EdgeSchema])

export interface IField {
  id: string
  name: Nullish<string>
  description: Nullish<string>
  key: string
  type: Ref<IAnyType>
}

export type ITypeEdge = z.infer<typeof TypeEdgeSchema>
