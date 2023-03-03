import type { IElement, TypedValue } from '@codelab/frontend/abstract/core'
import {
  expressionTransformer,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import React from 'react'
import type { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import {
  antdAtoms,
  codelabAtoms,
  htmlAtoms,
  muiAtoms,
  reactAtoms,
} from '../atoms/atoms'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'
import { getRootElement } from '../utils/getRootElement'

/**
 * Transforms props from the following format:
 * {
 *   [$propName]: {
 *     type: '<id of a type with kind RenderPropsType>',
 *     value: '$componentId'
 *   }
 * }
 *
 * into:
 * {
 *   [$propName]: <(...args) => ReactNode - A function that renders the component with id: $componentId>
 * }
 */
@model('@codelab/RenderPropsTypedValueTransformer')
export class RenderPropsTypedValueTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedValueTransformer
{
  canHandleTypeKind(typeKind: ITypeKind): boolean {
    return typeKind === ITypeKind.RenderPropsType
  }

  canHandleValue(value: TypedValue<unknown>): boolean {
    return (
      typeof value.value === 'string' &&
      (Boolean(
        getRootElement(value, this.componentService, this.elementService),
      ) ||
        hasStateExpression(value.value))
    )
  }

  public transform(value: TypedValue<string>) {
    if (hasStateExpression(value.value)) {
      const { values } = this.renderer.appStore.current.state

      const atoms = {
        ...htmlAtoms,
        ...codelabAtoms,
        ...antdAtoms,
        ...muiAtoms,
        ...reactAtoms,
      }

      const evaluationContext = { atoms, React, ...values }

      return expressionTransformer.transpileAndEvaluateExpression(
        value.value,
        evaluationContext,
      )
    }

    const rootElement = getRootElement(
      value,
      this.componentService,
      this.elementService,
    )

    if (!rootElement) {
      return value
    }

    return this.makeRenderProp(rootElement)
  }

  private makeRenderProp(element: IElement) {
    return (renderPropArgs: Array<unknown>) =>
      this.renderer.renderElement(element, renderPropArgs)
  }
}
