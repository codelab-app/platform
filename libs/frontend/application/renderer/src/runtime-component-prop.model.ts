import {
  getRendererService,
  type IEvaluationContext,
  type IRuntimeComponentPropDTO,
  type IRuntimeComponentPropModel,
  type IRuntimeContainerNodeModel,
} from '@codelab/frontend/abstract/application'
import type { IPropModel } from '@codelab/frontend/abstract/domain'
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
import isNil from 'lodash/isNil'
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
      this.childMapperProp,
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

      return transformer.transform(value, this.runtimeComponent.current)
    })
  }

  evaluateProps(context: IEvaluationContext) {
    // evaluate expressions but with empty context
    return evaluateObject(this.renderedTypedProps, context)
  }

  @computed
  get evaluatedProps() {
    return this.expressionEvaluationContext.props
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
  get childMapperProp(): Maybe<IPropData> {
    const { childMapperIndex, runtimeParent } = this.runtimeComponent.current

    const runtimeParentElementProps = runtimeParent
      ? runtimeParent.current.runtimeProps
      : undefined

    const props = runtimeParentElementProps?.evaluatedChildMapperProps || []

    return props[Number(childMapperIndex)]
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

  addAndBind(context: IEvaluationContext) {
    context['props'] = this.evaluateProps(context)

    return context
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
      url: {},
    })
  }
}
