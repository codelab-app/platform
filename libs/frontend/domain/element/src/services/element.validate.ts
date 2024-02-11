import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { IElementDto } from '@codelab/shared/abstract/core'
import {
  assertContainsAtLeastOne,
  assertContainsAtMostOne,
  assertContainsExactlyOne,
  containsNone,
} from '@codelab/shared/utils'

export const validateElement = (element: IElementModel) => {
  const { isRoot, page, parentComponent } = element

  if (isRoot) {
    assertContainsExactlyOne([page, parentComponent], {
      message: 'Root element requires exactly 1 container',
    })
  }
}

export const validateElementDto = (element: IElementDto) => {
  const { nextSibling, page, parentComponent, parentElement, prevSibling } =
    element

  /**
   * If we don't have any containers, we must have have element connection
   */

  if (containsNone([parentComponent, page])) {
    assertContainsAtLeastOne([prevSibling, nextSibling, parentElement], {
      message:
        'An element without container requires at least one element connection',
    })

    // These are mutually exclusive
    assertContainsAtMostOne([prevSibling, parentElement])
  } else {
    assertContainsExactlyOne([parentComponent, page], {
      message: 'Can only have 1 container',
    })
  }
}

/**
 * We extract the use case from our data
 */
export const isAddingAsFirstChild = (element: IElementModel) => {
  const { parentElement } = element

  return parentElement
}
