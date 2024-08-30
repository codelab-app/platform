import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { IElementDto } from '@codelab/shared/abstract/core'
import {
  TAtLeastOne,
  TAtMostOne,
  TExactlyOne,
  TNone,
  Validator,
} from '@codelab/shared/infra/schema'

export const validateElement = (element: IElementModel) => {
  const { isRoot, page, parentComponent } = element

  if (isRoot) {
    Validator.asserts(TAtLeastOne, [page, parentComponent], {
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

  if (Validator.validate(TNone, [parentComponent, page])) {
    Validator.asserts(TAtLeastOne, [prevSibling, nextSibling, parentElement], {
      message:
        'An element without container requires at least one element connection',
    })

    // These are mutually exclusive
    Validator.asserts(TAtMostOne, [prevSibling, parentElement])
  } else {
    Validator.asserts(TExactlyOne, [parentComponent, page], {
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
