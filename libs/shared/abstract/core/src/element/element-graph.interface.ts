import { z } from 'zod'
import { ElementSchema } from './element.interface'

export const ElementEdgeSchema = z.object({
  source: z.string(),
  target: z.string(),
  order: z.number().nullable(),
})

export type IElementEdge = z.infer<typeof ElementEdgeSchema>

export const ElementGraphSchema = z.object({
  vertices: z.array(ElementSchema).default([]),
  edges: z.array(ElementEdgeSchema).default([]),
})

export type IElementGraph = z.infer<typeof ElementGraphSchema>
