import type { IElementModel } from '@codelab/frontend/abstract/core'

export const elementValidate = (element: IElementModel) => {
  const hasParentComponent = Boolean(element.parentComponent)
  const hasPage = Boolean(element.page)

  if ([hasParentComponent, hasPage].filter(Boolean).length !== 1) {
    throw new Error('Element must have exactly one container')
  }
}
