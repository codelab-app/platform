import { DATA_ID } from '@codelab/frontend/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'

export const querySelectorRenderedElement = (nodeId: string) => {
  if (!document) {
    return null
  }

  return document.querySelector(
    `[${DATA_ID}="${nodeId}"]`,
  ) as Nullable<HTMLElement>
}
