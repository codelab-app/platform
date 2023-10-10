import type { IMoveElementContext } from '@codelab/frontend/abstract/domain'
import { assertContainsAtMostOne } from '@codelab/shared/utils'

/**
 * We either change parentElement or prevSibling to move, but not both
 */
export const validateMoveElement = (context: IMoveElementContext) => {
  const { nextSibling, parentElement, prevSibling } = context

  assertContainsAtMostOne([parentElement, nextSibling, prevSibling])
}
