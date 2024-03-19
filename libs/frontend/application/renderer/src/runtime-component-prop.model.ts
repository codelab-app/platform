import type {
  IRuntimeComponentModel,
  IRuntimeComponentPropDTO,
  IRuntimeComponentPropModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IEvaluationContext,
} from '@codelab/frontend/abstract/application'
import type { IPropModel } from '@codelab/frontend/abstract/domain'
import {
  DATA_COMPONENT_ID,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { evaluateObject, mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'

const create = (dto: IRuntimeComponentPropDTO) =>
  new RuntimeComponentPropModel(dto)

@model('@codelab/RuntimeComponentProp')
export class RuntimeComponentPropModel
  extends Model({
    customProps: prop<Maybe<IPropModel>>(() => undefined).withSetter(),
    id: idProp,
    runtimeComponent: prop<Ref<IRuntimeComponentModel>>(),
  })
  implements IRuntimeComponentPropModel
{
  static create = create

  @computed
  get childMapperProp(): Maybe<IPropData> {
    const { childMapperIndex, runtimeParent } = this.runtimeComponent.current

    const runtimeParentElementProps = runtimeParent
      ? runtimeParent.current.runtimeProps
      : undefined

    const props = runtimeParentElementProps?.evaluatedChildMapperProps || []

    return props[Number(childMapperIndex)]
  }

  get component() {
    return this.runtimeComponent.current.component.current
  }

  @computed
  get componentEvaluatedProps() {
    return mergeProps(
      this.evaluatedProps,
      this.instanceElementProps,
      this.childMapperProp,
    )
  }

  @computed
  get evaluatedProps() {
    return this.expressionEvaluationContext.props
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    return this.addAndBind({
      actions: {},
      componentProps: {},
      props: {},
      refs: {},
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: {},
      urlProps: {},
    })
  }

  @computed
  get instanceElementProps(): Maybe<IPropData> {
    if (this.runtimeComponent.current.isTypedProp) {
      return undefined
    }

    const { runtimeParent } = this.runtimeComponent.current

    return runtimeParent
      ? runtimeParent.current.runtimeProps.evaluatedProps
      : undefined
  }

  @computed
  get props() {
    return mergeProps(
      this.component.api.current.defaultValues,
      this.component.props.values,
      this.customProps?.values,
      {
        [DATA_COMPONENT_ID]: this.component.id,
        key: this.component.id,
      },
    )
  }

  /**
   * Applies all the type transformers to the props
   */
  @computed
  get renderedTypedProps() {
    return mapDeep(this.props, (value, key) => {
      if (!isTypedProp(value)) {
        return value
      }

      if (!value.value) {
        return undefined
      }

      const transformer = this.renderer.typedPropTransformers.get(value.kind)

      if (!transformer) {
        return value.value
      }

      return transformer.transform(
        value,
        key.toString(),
        this.runtimeComponent.current,
      )
    })
  }

  @computed
  get renderer() {
    const activeRenderer = getRendererService(this).activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get runtimeStore() {
    return this.runtimeComponent.current.runtimeStore
  }

  addAndBind(context: IEvaluationContext) {
    context['props'] = this.evaluateProps(context)

    return context
  }

  evaluateProps(context: IEvaluationContext) {
    // evaluate expressions but with empty context
    return evaluateObject(this.renderedTypedProps, context)
  }
}
