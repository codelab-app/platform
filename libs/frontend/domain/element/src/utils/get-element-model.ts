import type { IElementModel } from '@codelab/frontend/abstract/core'
import {
  isAtomInstance,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import type { IElementRenderType } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'

export const getElementModel = (element: IElementModel) => {
  let renderType: RenderType | null = null

  if (isAtomInstance(element.renderType)) {
    renderType = {
      id: element.renderType.id,
      kind: IElementRenderTypeKind.Atom,
    }
  }

  if (isComponentInstance(element.renderType)) {
    renderType = {
      id: element.renderType.id,
      kind: IElementRenderTypeKind.Component,
    }
  }

  return {
    childMapperComponent: element.childMapperComponent
      ? { id: element.childMapperComponent.id }
      : null,
    childMapperPreviousSibling: element.childMapperPreviousSibling
      ? { id: element.childMapperPreviousSibling.id }
      : null,
    childMapperPropKey: element.childMapperPropKey,
    id: element.id,
    name: element.name,
    postRenderAction: element.postRenderAction
      ? { id: element.postRenderAction.current.id }
      : null,
    preRenderAction: element.preRenderAction
      ? { id: element.preRenderAction.current.id }
      : null,
    renderForEachPropKey: element.renderForEachPropKey,
    renderIfExpression: element.renderIfExpression,
    renderType,
  }
}
