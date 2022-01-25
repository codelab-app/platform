import { z } from 'zod'
import { EdgeSchema } from '../graph'
import { ElementSchema } from './element.interface'

export const ElementEdgeSchema = EdgeSchema

export type IElementEdge = z.infer<typeof ElementEdgeSchema>

export const ElementGraphSchema = z.object({
  vertices: z.array(ElementSchema).default([]),
  edges: z.array(ElementEdgeSchema).default([]),
})

export type IElementGraph = z.infer<typeof ElementGraphSchema>
