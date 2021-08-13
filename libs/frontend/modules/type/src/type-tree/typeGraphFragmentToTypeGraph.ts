import { __TypeGraphFragment } from '@codelab/shared/codegen/graphql'
import { ITypeGraph } from '@codelab/shared/graph'
import { typeFragmentToTypeVertex } from './typeFragmentToTypeVertex'

export const typeGraphFragmentToTypeGraph = (
  fragment: __TypeGraphFragment,
): ITypeGraph => ({
  edges: fragment.edges,
  vertices: fragment.vertices.map((v) => typeFragmentToTypeVertex(v)),
})
