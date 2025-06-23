import type { IRef } from '@codelab/shared-abstract-core'

export const shouldMoveElementAsNextSibling = (
  currentPrevSibling: Partial<IRef>,
  newPrevSiblingId: Partial<IRef>,
) => {
  const changePrevSibling = currentPrevSibling !== newPrevSiblingId

  return changePrevSibling && newPrevSiblingId
}

export const shouldMoveElementAsFirstChild = (
  currentParentElement: Partial<IRef>,
  newParentElement: Partial<IRef>,
  currentPrevSibling: Partial<IRef>,
  newPrevSibling: Partial<IRef>,
) => {
  const changeParent = currentParentElement.id !== newParentElement.id
  const changePrevSibling = currentPrevSibling.id !== newPrevSibling.id

  /**
   * If we have parent element, means we want to set as first child
   */
  if (changeParent && currentParentElement.id) {
    return true
  }

  /**
   *
   */
  if (changePrevSibling && !newPrevSibling.id) {
    return true
  }

  return false
}
