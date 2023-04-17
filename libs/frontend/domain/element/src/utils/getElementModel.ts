import type { IElement, RenderType } from '@codelab/frontend/abstract/core'
import {
  IRenderTypeKind,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'

export const getElementModel = (element: IElement) => {
  let renderType: RenderType | null = null

  if (isAtomInstance(element.renderType)) {
    renderType = {
      id: element.renderType.id,
      kind: IRenderTypeKind.Atom,
    }
  }

  if (isComponentInstance(element.renderType)) {
    renderType = {
      id: element.renderType.id,
      kind: IRenderTypeKind.Component,
    }
  }

  return {
    id: element.id,
    name: element.name,
    // postRenderAction: element.postRenderAction,
    // preRenderAction: element.preRenderAction,
    renderForEachPropKey: element.renderForEachPropKey,
    renderIfExpression: element.renderIfExpression,
    renderType,
  }
}
