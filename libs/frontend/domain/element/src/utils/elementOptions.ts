import type { IElement } from '@codelab/frontend/abstract/core'

export const mapElementOption = (element: IElement) => ({
  value: element.id,
  childrenIds: element.children.map(({ id }) => id),
  label: element.label,
})
