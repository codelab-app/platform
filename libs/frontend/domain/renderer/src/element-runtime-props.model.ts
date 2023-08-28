import type {
  IElement,
  IElementRuntimeProp,
} from '@codelab/frontend/abstract/core'
import {
  DATA_ELEMENT_ID,
  isAtomInstance,
} from '@codelab/frontend/abstract/core'
import {
  evaluateExpression,
  evaluateObject,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { getDefaultFieldProps } from '@codelab/shared/utils'
import get from 'lodash/get'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { BaseRuntimeProps } from './base-runtime-props.model'

const create = (nodeRef: Ref<IElement>) => new ElementRuntimeProps({ nodeRef })

@model('@codelab/ElementRuntimeProps')
export class ElementRuntimeProps
  extends ExtendedModel(
    modelClass<BaseRuntimeProps<IElement>>(BaseRuntimeProps),
    {},
  )
  implements IElementRuntimeProp
{
  @computed
  get props() {
    // memorize values or else it will be lost inside callback
    const refKey = this.node.refKey
    const store = this.node.store.current
    // refs are used only for elements with atoms
    const shouldUseRef = isAtomInstance(this.node.renderType)

    return {
      ...(this.node.renderType
        ? getDefaultFieldProps(this.node.renderType.current)
        : {}),
      ...this.node.props.current.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      [DATA_ELEMENT_ID]: this.node.id,
      // used for atoms which are loaded using `dynamicLoader`
      forwardedRef:
        shouldUseRef && refKey
          ? (node: HTMLElement) => store.registerRef(refKey, node)
          : undefined,
      key: this.node.id,
      // used for simple Html atoms which are simple strings tags
      ref:
        shouldUseRef && refKey
          ? (node: HTMLElement) => store.registerRef(refKey, node)
          : undefined,
    }
  }

  @computed
  get evaluatedProps() {
    return evaluateObject(
      this.renderedTypedProps,
      this.node.propsEvaluationContext,
    )
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return evaluateObject(this.props, this.node.propsEvaluationContext)
  }

  @computed
  get evaluatedChildMapperProp() {
    if (!this.node.childMapperPropKey) {
      return []
    }

    if (hasStateExpression(this.node.childMapperPropKey)) {
      const evaluatedExpression = evaluateExpression(
        this.node.childMapperPropKey,
        this.node.propsEvaluationContext,
      )

      if (!Array.isArray(evaluatedExpression)) {
        console.error('The evaluated childMapperPropKey is not an array')

        return []
      }

      return evaluatedExpression
    }

    const evaluatedChildMapperProp = get(
      this.node.expressionEvaluationContext,
      this.node.childMapperPropKey,
    )

    if (!Array.isArray(evaluatedChildMapperProp)) {
      console.error('The evaluated childMapperPropKey is not an array')

      return []
    }

    return evaluatedChildMapperProp
  }

  static create = create
}
