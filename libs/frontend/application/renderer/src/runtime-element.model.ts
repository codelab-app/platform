import type {
  IRuntimeElementDTO,
  IRuntimeElementModel,
  IRuntimeModelRef,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
  isRuntimeElementRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type {
  IElementModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_ELEMENT_ID,
  isAtomRef,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  evaluateObject,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import { getDefaultFieldProps } from '@codelab/frontend/domain/prop'
import type { IPropData, IRef } from '@codelab/shared/abstract/core'
import { mapDeep, throwIfUndefined } from '@codelab/shared/utils'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'

const create = ({ elementRef, parentRef }: IRuntimeElementDTO) => {
  return new RuntimeElement({ elementRef, parentRef })
}

@model('@codelab/RuntimeElement')
export class RuntimeElement
  extends Model({
    elementRef: prop<Ref<IElementModel>>(),
    id: idProp,
    parentRef: prop<IRuntimeModelRef>(),
  })
  implements IRuntimeElementModel
{
  static create = create

  @computed
  get element() {
    return this.elementRef.current
  }

  @computed
  get parent() {
    return this.parentRef.current
  }

  @computed
  get closestRuntimeContainerNode() {
    if (isRuntimeElementRef(this.parentRef)) {
      return this.parentRef.current.closestRuntimeContainerNode
    }

    return this.parentRef.current
  }

  @computed
  get runtimeStore() {
    return this.closestRuntimeContainerNode.runtimeStore.current
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

  @computed
  get evaluatedChildMapperProp() {
    if (!this.element.childMapperPropKey) {
      return []
    }

    if (hasStateExpression(this.element.childMapperPropKey)) {
      const evaluatedExpression = evaluateExpression(
        this.element.childMapperPropKey,
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
      this.element.childMapperPropKey,
    )

    if (!Array.isArray(evaluatedChildMapperProp)) {
      console.error('The evaluated childMapperPropKey is not an array')

      return []
    }

    return evaluatedChildMapperProp
  }

  /**
   * Applies all the type transformers to the props
   */
  @computed
  get renderedTypedProps() {
    return mapDeep(this.props, (value) => {
      if (!isTypedProp(value)) {
        return value
      }

      if (!value.value) {
        return undefined
      }

      const transformer = this.renderer?.typedPropTransformers.get(value.kind)

      if (!transformer) {
        return value.value
      }

      return transformer.transform(value, this.element)
    })
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

    const customTextProp = this.element.props.values[CUSTOM_TEXT_PROP_KEY]
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
    const registerReference = isAtomRef(this.element.renderType)
    const slug = this.element.slug
    const store = this.runtimeStore

    return {
      ...getDefaultFieldProps(this.element.renderType.current),
      ...this.element.props.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      [DATA_ELEMENT_ID]: this.element.id,
      key: this.element.id,
      ref: registerReference
        ? (node: HTMLElement) => store.registerRef(slug, node)
        : undefined,
    }
  }

  @computed
  get propsEvaluationContext(): IEvaluationContext {
    const component =
      this.element.closestSubTreeRootElement.parentComponent?.current

    const providerStore = this.runtimeStore.store

    return {
      actions: this.runtimeStore.runtimeActions,
      componentProps: this.closestRuntimeContainerNode.evaluatedProps,
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.runtimeStore.refs,
      rendererType: this.renderer?.rendererType,
      rootActions: this.providerStore?.actionRunners ?? {},
      rootRefs: this.providerStore?.refs || {},
      rootState: this.providerStore?.state || {},
      state: this.element.store.current.state,
      url: this.urlProps ?? {},
    }
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    return {
      ...this.propsEvaluationContext,
      props: this.evaluatedProps,
    }
  }

  runtimeAction(actionRef: IRef) {
    const runtimeAction = this.runtimeActions.find(
      (action) => action.id === actionRef.id,
    )

    return throwIfUndefined(runtimeAction)
  }

  @computed
  get renderer() {
    return getRendererService(this).activeRenderer?.current
  }
}
