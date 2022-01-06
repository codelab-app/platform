import { IElement } from '@codelab/shared/abstract/core'

export const containerKey = (element: IElement) =>
  `${element.id}-${element.hooks.length}`
