import type {
  IElement,
  IElementRuntimeProp,
} from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_ELEMENT_ID,
  isAtomInstance,
  RendererType,
} from '@codelab/frontend/abstract/core'
import {
  evaluateExpression,
  evaluateObject,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { getDefaultFieldProps } from '@codelab/shared/utils'
import get from 'lodash/get'
import omit from 'lodash/omit'
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
    const registerReference = isAtomInstance(this.node.renderType)
    const slug = this.node.slug
    const store = this.node.store.current

    return {
      ...(this.node.renderType
        ? getDefaultFieldProps(this.node.renderType.current)
        : {}),
      ...this.node.props.current.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      [DATA_ELEMENT_ID]: this.node.id,
      key: this.node.id,
      ref: registerReference
        ? (node: HTMLElement) => store.registerRef(slug, node)
        : undefined,
    }
  }

  @computed
  get evaluatedProps() {
    // Evaluate customText prop only in preview mode
    if (
      this.node.propsEvaluationContext.rendererType !== RendererType.Preview
    ) {
      const customTextProp =
        this.nodeRef.current.props.current.values[CUSTOM_TEXT_PROP_KEY]

      const props = omit(this.renderedTypedProps, [CUSTOM_TEXT_PROP_KEY])
      const evaluated = evaluateObject(props, this.node.propsEvaluationContext)

      return { ...evaluated, [CUSTOM_TEXT_PROP_KEY]: customTextProp }
    }

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
