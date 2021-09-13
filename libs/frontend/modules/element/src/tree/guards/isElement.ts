import { ElementFragment } from '../../graphql'
import { ElementTreeGraphqlVertex } from '../ElementTreeGraphql'

export const isElement = (
  vertex: ElementTreeGraphqlVertex,
): vertex is ElementFragment => {
  return vertex?.__typename === 'Element'
}
