import type { Nullable } from '@codelab/shared-abstract-types'

export const queryById = (nodeId: string): Nullable<HTMLElement> => {
  if (typeof document === 'undefined') {
    return null
  }

  return document.querySelector(`#${nodeId}`)
}
