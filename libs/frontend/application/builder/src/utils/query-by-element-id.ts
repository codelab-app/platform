import type { Nullable } from '@codelab/shared-abstract-types'

import { DATA_ELEMENT_ID } from '@codelab/frontend-abstract-domain'

export const queryByElementId = (nodeId: string): Nullable<HTMLElement> => {
  if (typeof document === 'undefined') {
    return null
  }

  const nodeQuerySelector = `[${DATA_ELEMENT_ID}="${nodeId}"]`

  return document.querySelector(nodeQuerySelector)
}
