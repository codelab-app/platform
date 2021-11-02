import { IEdge } from '@codelab/shared/abstract/core'

export const edgeId = (edge: IEdge) => `${edge.source}--${edge.target}`
