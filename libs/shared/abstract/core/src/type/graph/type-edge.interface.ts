import { z } from 'zod'
import { EdgeSchema, IEdge } from '../../graph'

export const FieldSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  key: z.string(),
  description: z.string().optional().nullable(),
})

export type IField = z.infer<typeof FieldSchema>

export const FieldTypeEdgeSchema = z.intersection(EdgeSchema, FieldSchema)

export const TypeEdgeSchema = z.union([FieldTypeEdgeSchema, EdgeSchema])

export type IFieldEdge = z.infer<typeof FieldTypeEdgeSchema>

export type ITypeEdge = z.infer<typeof TypeEdgeSchema>

export const typeEdgeIsField = (edge: IEdge): edge is IFieldEdge => {
  return edge && (edge as IFieldEdge).id && ((edge as IFieldEdge).key as any)
}
