import type {
  IElementModel,
  IElementRuntimeProp,
} from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_ELEMENT_ID,
  isAtomRef,
  RendererType,
} from '@codelab/frontend/abstract/domain'
import { getDefaultFieldProps } from '@codelab/frontend/domain/prop'
import {
  evaluateExpression,
  evaluateObject,
  hasExpression,
} from '@codelab/frontend/shared/utils'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { BaseRuntimeProps } from './base-runtime-props.model'

const create = (nodeRef: Ref<IElementModel>) =>
  new ElementRuntimeProps({ nodeRef })

@model('@codelab/ElementRuntimeProps')
export class ElementRuntimeProps
  extends ExtendedModel(
    modelClass<BaseRuntimeProps<IElementModel>>(BaseRuntimeProps),
    {},
  )
  implements IElementRuntimeProp
{
  static create = create

  @computed
  get evaluatedChildMapperProp() {
    if (!this.node.childMapperPropKey) {
      return []
    }

    if (hasExpression(this.node.childMapperPropKey)) {
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

  @computed
  get evaluatedProps() {
    const { rendererType } = this.node.propsEvaluationContext

    // Evaluate customText prop only in preview and production modes
    if (
      rendererType === RendererType.Preview ||
      rendererType === RendererType.Production
    ) {
      return evaluateObject(
        this.renderedTypedProps,
        this.node.propsEvaluationContext,
      )
    }

    const customTextProp =
      this.nodeRef.current.props.current.values[CUSTOM_TEXT_PROP_KEY]

    const props = omit(this.renderedTypedProps, [CUSTOM_TEXT_PROP_KEY])
    const evaluated = evaluateObject(props, this.node.propsEvaluationContext)

    return { ...evaluated, [CUSTOM_TEXT_PROP_KEY]: customTextProp }
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return evaluateObject(this.props, this.node.propsEvaluationContext)
  }

  @computed
  get props() {
    // memorize values or else it will be lost inside callback
    const registerReference = isAtomRef(this.node.renderType)
    const slug = this.node.slug
    const store = this.node.store.current

    return {
      ...getDefaultFieldProps(this.node.renderType.current),
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
}
