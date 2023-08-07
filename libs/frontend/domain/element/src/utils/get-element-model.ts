import type { IElement } from '@codelab/frontend/abstract/core'
import {
  isAtomInstance,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import type { RenderType } from '@codelab/shared/abstract/core'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'

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
    refKey: element.refKey,
    renderForEachPropKey: element.renderForEachPropKey,
    renderIfExpression: element.renderIfExpression,
    renderType,
  }
}
