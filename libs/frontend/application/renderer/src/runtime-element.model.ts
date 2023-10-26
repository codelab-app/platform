import type {
  IElementModel,
  IRuntimeElement,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_ELEMENT_ID,
  IElementTreeViewDataNode,
  IEvaluationContext,
  isAtomRef,
  RendererType,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  evaluateObject,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import { getDefaultFieldProps } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { RuntimeBase } from './runtime-base.model'

const create = (nodeRef: Ref<IElementModel>) => new RuntimeElement({ nodeRef })

@model('@codelab/ElementRuntimeProps')
export class RuntimeElement
  extends ExtendedModel(modelClass<RuntimeBase<IElementModel>>(RuntimeBase), {})
  implements IRuntimeElement
{
  static create = create

  @computed
  get evaluatedChildMapperProp() {
    if (!this.node.childMapperPropKey) {
      return []
    }

    if (hasStateExpression(this.node.childMapperPropKey)) {
      const evaluatedExpression = evaluateExpression(
        this.node.childMapperPropKey,
        this.propsEvaluationContext,
      )

      if (!Array.isArray(evaluatedExpression)) {
        console.error('The evaluated childMapperPropKey is not an array')

        return []
      }

      return evaluatedExpression
    }

    const evaluatedChildMapperProp = get(
      this.expressionEvaluationContext,
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
    const { rendererType } = this.propsEvaluationContext

    // Evaluate customText prop only in preview and production modes
    if (
      rendererType === RendererType.Preview ||
      rendererType === RendererType.Production
    ) {
      return evaluateObject(
        this.renderedTypedProps,
        this.propsEvaluationContext,
      )
    }

    const customTextProp =
      this.nodeRef.current.props.values[CUSTOM_TEXT_PROP_KEY]

    const props = omit(this.renderedTypedProps, [CUSTOM_TEXT_PROP_KEY])
    const evaluated = evaluateObject(props, this.propsEvaluationContext)

    return { ...evaluated, [CUSTOM_TEXT_PROP_KEY]: customTextProp }
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return evaluateObject(this.props, this.propsEvaluationContext)
  }

  @computed
  get props() {
    // memorize values or else it will be lost inside callback
    const registerReference = isAtomRef(this.node.renderType)
    const slug = this.node.slug
    const store = this.node.store.current

    return {
      ...getDefaultFieldProps(this.node.renderType.current),
      ...this.node.props.values,
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
  get propsEvaluationContext(): IEvaluationContext {
    const component =
      this.node.closestSubTreeRootElement.parentComponent?.current

    return {
      actions: this.node.store.current.actionRunners,
      componentProps: component
        ? this.renderer?.runtimeComponent(component)?.componentEvaluatedProps ??
          {}
        : {},
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.node.store.current.refs,
      rendererType: this.renderer?.rendererType,
      rootActions: this.providerStore?.actionRunners ?? {},
      rootRefs: this.providerStore?.refs || {},
      rootState: this.providerStore?.state || {},
      state: this.node.store.current.state,
      url: this.urlProps ?? {},
    }
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    return {
      ...this.propsEvaluationContext,
      props: this.evaluatedProps || {},
    }
  }

  @computed
  get providerStore(): IStoreModel | undefined {
    return this.renderer?.providerTree?.current.rootElement.current.store
      .current
  }

  @computed
  get urlProps(): IPropData | undefined {
    return this.renderer?.urlSegments
  }
}
