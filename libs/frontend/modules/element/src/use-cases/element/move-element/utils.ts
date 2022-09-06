import { Nullable } from '@codelab/shared/abstract/types'

export const shouldMoveElementAsNextSibling = (
  currentPrevSibling: Nullable<string>,
  newPrevSiblingId: Nullable<string>,
) => {
  const changePrevSibling = currentPrevSibling !== newPrevSiblingId

  return changePrevSibling && newPrevSiblingId
}

export const shouldMoveElementAsSubRoot = (
  currentParentEmentId: Nullable<string>,
  newParentElementId: Nullable<string>,
  currentPrevSibling: Nullable<string>,
  newPrevSiblingId: Nullable<string>,
) => {
  const changeParent = currentParentEmentId !== newParentElementId
  const changePrevSibling = currentPrevSibling !== newPrevSiblingId

  if (changeParent && currentParentEmentId) {
    return true
  }

  // clear prevSibling, move to begin of the tree branch
  if (changePrevSibling && !newPrevSiblingId) {
    return true
  }

  return false
}
