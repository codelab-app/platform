import { Nullish } from '@codelab/shared/abstract/types'

export const shouldMoveElementAsNextSibling = (
  currentPrevSibling: Nullish<string>,
  newPrevSiblingId: Nullish<string>,
) => {
  const changePrevSibling = currentPrevSibling !== newPrevSiblingId

  return changePrevSibling && newPrevSiblingId
}

export const shouldMoveElementAsSubRoot = (
  currentParentEmentId: Nullish<string>,
  newParentElementId: Nullish<string>,
  currentPrevSibling: Nullish<string>,
  newPrevSiblingId: Nullish<string>,
) => {
  const changeParent = currentParentEmentId !== newParentElementId
  const changePrevSibling = currentPrevSibling !== newPrevSiblingId

  if (changeParent && currentParentEmentId) {
    return true
  }

  if (changePrevSibling && !newPrevSiblingId) {
    return true
  }

  return false
}
