import { Nullable } from '@codelab/shared/abstract/types'

export const querySelectorRenderedElement = (nodeId: string) => {
  if (!document) {
    return null
  }

  return document.querySelector(
    `[data-id="${nodeId}"]`,
  ) as Nullable<HTMLElement>
}
