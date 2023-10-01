import type { IElementModel } from '@codelab/frontend/abstract/core'

export const elementValidate = (element: IElementModel) => {
  const hasParentComponent = Boolean(element.parentComponent)
  const hasPage = Boolean(element.page)
  const hasParentElement = Boolean(element.parentElement)

  if (
    [hasParentComponent, hasPage, hasParentElement].filter(Boolean).length !== 1
  ) {
    console.error(element)
    throw new Error('Element must have exactly one container')
  }
}
