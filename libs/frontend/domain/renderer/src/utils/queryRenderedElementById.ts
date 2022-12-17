import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'

export const queryRenderedElementById = (
  nodeId: string,
): Nullable<HTMLElement> => {
  if (typeof document === 'undefined') {
    return null
  }

  const nodeQuerySelector = `[${DATA_ELEMENT_ID}="${nodeId}"]`

  return document.querySelector(nodeQuerySelector)
}
