import { IElement } from '@codelab/frontend/abstract/core'

export const mapElementOption = (element: IElement) => ({
  value: element.id,
  childrenIds: element.children.map((c) => c.id),
  label: element.label,
})
