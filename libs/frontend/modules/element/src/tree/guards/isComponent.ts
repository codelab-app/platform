import { ComponentFragment } from '../../graphql/ElementGraph.fragment.api.graphql'
import { ElementTreeGraphqlVertex } from '../ElementTreeGraphql'

export const isComponent = (
  vertex: ElementTreeGraphqlVertex,
): vertex is ComponentFragment => {
  return vertex?.__typename === 'Component'
}
