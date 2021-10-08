import { IElement } from '@codelab/frontend/abstract/core'

export const isElement = (vertex: IElement): vertex is IElement => {
  return !vertex.componentTag
}
