import type { IElement } from '@codelab/frontend/abstract/core'

export const mapElementOption = (element: IElement) => ({
  childrenIds: element.children.map(({ id }) => id),
  label: element.label,
  value: element.id,
})
