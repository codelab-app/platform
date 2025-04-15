import type { IMoveElementContext } from '@codelab/frontend-abstract-domain'

import { TAtMostOne, Validator } from '@codelab/shared-infra-typebox'

/**
 * We either change parentElement or prevSibling to move, but not both
 */
export const validateMoveElement = (context: IMoveElementContext) => {
  const { nextSibling, parentElement, prevSibling } = context

  Validator.asserts(TAtMostOne, [parentElement, nextSibling, prevSibling], {
    message: 'Has at most one',
  })
}
