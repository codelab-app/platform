import { ComponentVertexFragment } from '../../graphql'
import { ElementTreeGraphqlVertex } from '../ElementTreeGraphql'

export const isComponent = (
  vertex: ElementTreeGraphqlVertex,
): vertex is ComponentVertexFragment => {
  return vertex?.__typename === 'Component'
}
