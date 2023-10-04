import type { IElementModel } from '@codelab/frontend/abstract/domain'

export const elementValidate = (element: IElementModel) => {
  const hasParentComponent = Boolean(element.parentComponent)
  console.log(element.page)

  const hasPage = Boolean(element.page)
  const isRoot = Boolean(element.isRoot)

  if (isRoot && [hasParentComponent, hasPage].filter(Boolean).length !== 1) {
    console.error({
      hasPage,
      hasParentComponent,
    })
    throw new Error('Element must have exactly one container')
  }
}
