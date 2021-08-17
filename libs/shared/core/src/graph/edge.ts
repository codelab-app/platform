import { Edge } from '@codelab/shared/abstract/core'

export const edgeId = (edge: Edge) => `${edge.source}--${edge.target}`
