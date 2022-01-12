import { DATA_ID } from '@codelab/frontend/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'

export const queryRenderedElementById = (nodeId: string) => {
  if (!document) {
    return null
  }

  const nodeQuerySelector = `[${DATA_ID}="${nodeId}"]`

  return document.querySelector(nodeQuerySelector) as Nullable<HTMLElement>
}
