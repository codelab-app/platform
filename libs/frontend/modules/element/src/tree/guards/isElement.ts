import { ElementFragment } from '../../graphql/Element.fragment.api.graphql.gen'
import { ElementTreeGraphqlVertex } from '../ElementTreeGraphql'

export const isElement = (
  vertex: ElementTreeGraphqlVertex,
): vertex is ElementFragment => {
  return vertex?.__typename === 'Element'
}
