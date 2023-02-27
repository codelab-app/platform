import type { IEntity, Nullable } from '@codelab/shared/abstract/types'

export const shouldMoveElementAsNextSibling = (
  currentPrevSibling: Partial<IEntity>,
  newPrevSiblingId: Partial<IEntity>,
) => {
  const changePrevSibling = currentPrevSibling !== newPrevSiblingId

  return changePrevSibling && newPrevSiblingId
}

export const shouldMoveElementAsFirstChild = (
  currentParentElement: Partial<IEntity>,
  newParentElement: Partial<IEntity>,
  currentPrevSibling: Partial<IEntity>,
  newPrevSibling: Partial<IEntity>,
) => {
  const changeParent = currentParentElement.id !== newParentElement.id
  const changePrevSibling = currentPrevSibling.id !== newPrevSibling.id

  if (changeParent && currentParentElement.id) {
    return true
  }

  // clear prevSibling, move to begin of the tree branch
  if (changePrevSibling && !newPrevSibling.id) {
    return true
  }

  return false
}
