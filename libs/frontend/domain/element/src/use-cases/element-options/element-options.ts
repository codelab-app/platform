import type { IElementModel } from '@codelab/frontend-abstract-domain'

export const mapElementOption = (element: IElementModel) => ({
  childrenIds: element.children.map(({ id }) => id),
  label: element.label,
  value: element.id,
})
