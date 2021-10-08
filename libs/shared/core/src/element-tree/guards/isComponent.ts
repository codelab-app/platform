import { IElement } from '@codelab/frontend/abstract/core'

export const isComponent = (vertex: IElement): vertex is IElement => {
  return !!vertex.componentTag
}
