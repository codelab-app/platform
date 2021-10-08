import { z } from 'zod'
import { IGraphInput, IVertexInput } from '../../graph'
import { TypeSchema } from '../types/type.interface'
import { ITypeEdge, TypeEdgeSchema } from './type-edge.interface'

export type ITypeGraphInput = IGraphInput<IVertexInput, ITypeEdge>

export const TypeGraphSchema = z.object({
  vertices: z.array(TypeSchema),
  edges: z.array(TypeEdgeSchema),
})

export type ITypeGraph = z.infer<typeof TypeGraphSchema>
