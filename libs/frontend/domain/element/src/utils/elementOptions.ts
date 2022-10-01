import { IElement } from '@codelab/shared/abstract/core'

export const mapElementOption = (element: IElement) => ({
  value: element.id,
  childrenIds: element.children.map((c) => c.id),
  label: element.label,
})
