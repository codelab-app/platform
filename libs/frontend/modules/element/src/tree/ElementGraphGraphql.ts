import { IGraph } from '@codelab/shared/abstract/core'
import { ElementEdgeFragment, ElementFragment } from '../graphql'

export type ElementGraphGraphql = IGraph<ElementFragment, ElementEdgeFragment>
