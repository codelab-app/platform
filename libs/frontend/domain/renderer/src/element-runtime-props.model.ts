import type {
  IElement,
  IElementRuntimeProp,
} from '@codelab/frontend/abstract/core'
import { DATA_ELEMENT_ID, IPropData } from '@codelab/frontend/abstract/core'
import {
  evaluateExpression,
  hasStateExpression,
  replaceStateInProps,
} from '@codelab/frontend/shared/utils'
import { getDefaultFieldProps, mergeProps } from '@codelab/shared/utils'
import attempt from 'lodash/attempt'
import get from 'lodash/get'
import isError from 'lodash/isError'
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
    }
  }

  @computed
  get preProceedProps(): IPropData {
    /**
     * Executes the prop transformation function
     * If successful, merges the result with the original props and returns it
     * If failed, returns the original props
     */

    const transformFn = this.node.transformPropsFn

    if (!transformFn) {
      return this.props
    }

    const parentComponentProps =
      this.node.parentComponent?.current.runtimeProp?.componentEvaluatedProps ||
      {}

    const result = attempt(transformFn, {
      ...this.props,
      ...parentComponentProps,
    })

    if (isError(result)) {
      console.warn('Unable to transform props', result)

      return this.props
    }

    return mergeProps(this.props, result)
  }

  @computed
  get evaluatedProps() {
    const componentProps = this.node.parentComponent?.current.runtimeProp
    const injectedProps = componentProps?.componentEvaluatedProps ?? {}

    return replaceStateInProps(
      this.renderedTypedProps,
      this.node.store.current.state,
      this.node.providerStore?.current.state,
      injectedProps,
      this.node.urlProps,
    )
  }

  @computed
  get evaluatedPropsBeforeRender() {
    const componentProps = this.node.parentComponent?.current.runtimeProp
    const injectedProps = componentProps?.componentEvaluatedProps ?? {}

    return replaceStateInProps(
      this.props,
      this.node.store.current.state,
      this.node.providerStore?.current.state,
      injectedProps,
      this.node.urlProps,
    )
  }

  @computed
  get evaluatedChildMapperProp() {
    const componentProps = this.node.parentComponent?.current.runtimeProp
    const injectedProps = componentProps?.componentEvaluatedProps ?? {}

    if (!this.node.childMapperPropKey) {
      return []
    }

    if (hasStateExpression(this.node.childMapperPropKey)) {
      const evaluatedExpression = evaluateExpression(
        this.node.childMapperPropKey,
        this.node.store.current.state,
        this.node.providerStore?.current.state,
        injectedProps,
      )

      if (!Array.isArray(evaluatedExpression)) {
        console.error('The evaluated childMapperPropKey is not an array')

        return []
      }

      return evaluatedExpression
    }

    const allPropsOptions = mergeProps(this.node.store.current.state, {
      props: injectedProps,
      rootState: this.node.providerStore?.current.state,
    })

    const evaluatedChildMapperProp = get(
      allPropsOptions,
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
