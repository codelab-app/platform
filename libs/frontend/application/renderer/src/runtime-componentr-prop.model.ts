import {
  getRendererService,
  type IEvaluationContext,
  type IRuntimeComponentPropDTO,
  type IRuntimeComponentPropModel,
  type IRuntimeContainerNodeModel,
} from '@codelab/frontend/abstract/application'
import {
  DATA_COMPONENT_ID,
  IComponentModel,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'

const create = (dto: IRuntimeComponentPropDTO) =>
  new RuntimeComponentPropModel(dto)

@model('@codelab/RuntimeComponentProp')
export class RuntimeComponentPropModel
  extends Model({
    id: idProp,
    runtimeComponent: prop<Ref<IRuntimeContainerNodeModel>>(),
  })
  implements IRuntimeComponentPropModel
{
  static create = create

  @computed
  get component(): IComponentModel {
    return this.runtimeComponent.current.containerNode
      .current as IComponentModel
  }

  @computed
  get runtimeStore() {
    return this.runtimeComponent.current.runtimeStore
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
  get componentEvaluatedProps() {
    return mergeProps(
      this.evaluatedProps,
      this.instanceElementProps,
      this.childMapperProps,
    )
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

      const transformer = this.renderer.typedPropTransformers.get(value.kind)

      if (!transformer) {
        return value.value
      }

      return transformer.transform(value, this.component)
    })
  }

  @computed
  get evaluatedProps() {
    return evaluateObject(this.renderedTypedProps, {
      actions: {},
      componentProps: {},
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.runtimeStore.state,
      url: {},
    })
  }

  @computed
  get instanceElementProps(): Maybe<IPropData> {
    const { runtimeParent } = this.runtimeComponent.current

    return runtimeParent
      ? runtimeParent.current.runtimeProps.evaluatedProps
      : undefined
  }

  @computed
  get childMapperProps(): Maybe<IPropData> {
    const { runtimeParent } = this.runtimeComponent.current

    const runtimeParentElementProps = runtimeParent
      ? runtimeParent.current.runtimeProps
      : undefined

    const props = runtimeParentElementProps?.evaluatedChildMapperProp || []
    // this.component.childMapperIndex
    const index = 2

    return undefined
  }

  @computed
  get props() {
    return mergeProps(
      this.component.api.current.defaultValues,
      this.component.props.values,
      {
        [DATA_COMPONENT_ID]: this.component.id,
        key: this.component.id,
      },
    )
  }

  @computed
  get propsEvaluationContext(): IEvaluationContext {
    return {
      actions: {},
      componentProps: {},
      // pass empty object because props can't evaluated by itself
      props: {},
      refs: this.runtimeStore.refs,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.runtimeStore.state,
      url: {},
    }
  }

  @computed
  get expressionEvaluationContext(): IEvaluationContext {
    return {
      ...this.propsEvaluationContext,
      props: this.evaluatedProps,
    }
  }
}
