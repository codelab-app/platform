import type { TypedValue } from '@codelab/frontend/abstract/core'
import {
  getComponentService,
  getElementService,
} from '@codelab/frontend/presenter/container'
import {
  expressionTransformer,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import React from 'react'
import type { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { antdAtoms, codelabAtoms, htmlAtoms, muiAtoms } from '../atoms'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'
import { getRootElement } from '../utils/getRootElement'

/**
 * Transforms props from the following format:
 * {
 *   [$propName]: {
 *     type: '<id of a type with kind ReactNodeType>',
 *     value: '$componentId'
 *   }
 * }
 *
 * into:
 * {
 *   [$propName]: <ReactNode - Rendered component with id: $componentId>
 * }
 */
@model('@codelab/ReactNodeTypedValueTransformer')
export class ReactNodeTypedValueTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedValueTransformer
{
  canHandleTypeKind(typeKind: ITypeKind): boolean {
    return typeKind === ITypeKind.ReactNodeType
  }

  canHandleValue(value: TypedValue<unknown>): boolean {
    const componentService = getComponentService(this)
    const elementService = getElementService(this)

    return (
      typeof value.value === 'string' &&
      (Boolean(getRootElement(value, componentService, elementService)) ||
        hasStateExpression(value.value))
    )
  }

  public transform(value: TypedValue<string>) {
    if (hasStateExpression(value.value)) {
      const { values } = this.renderer.appStore.current.state
      const atoms = { ...htmlAtoms, ...codelabAtoms, ...antdAtoms, ...muiAtoms }
      const evaluationContext = { React, atoms, ...values }

      const transpiledValue =
        expressionTransformer.transpileAndEvaluateExpression(
          value.value,
          evaluationContext,
        )

      return typeof transpiledValue === 'function'
        ? transpiledValue.call(evaluationContext)
        : transpiledValue
    }

    const rootElement = getRootElement(
      value,
      this.componentService,
      this.elementService,
    )

    if (!rootElement) {
      return value
    }

    return this.renderer.renderElement(rootElement)
  }
}
