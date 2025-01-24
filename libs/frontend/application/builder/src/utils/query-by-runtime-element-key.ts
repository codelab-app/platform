import type { Nullable } from '@codelab/shared/abstract/types'

import { DATA_RUNTIME_ELEMENT_KEY } from '@codelab/frontend/abstract/domain'

export const queryByRuntimeElementKey = (
  nodeId: string,
): Nullable<HTMLElement> => {
  if (typeof document === 'undefined') {
    return null
  }

  const nodeQuerySelector = `[${DATA_RUNTIME_ELEMENT_KEY}="${nodeId}"]`

  return document.querySelector(nodeQuerySelector)
}
