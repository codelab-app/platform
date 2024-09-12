import type {
  IRuntimeComponentModel,
  IRuntimeComponentPropDTO,
  IRuntimeComponentPropModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  IRuntimeContext,
} from '@codelab/frontend/abstract/application'
import type { IPropModel } from '@codelab/frontend/abstract/domain'
import {
  DATA_COMPONENT_ID,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import type { IPropData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { evaluateObject, mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import { Fragment } from 'react'

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
      this.instanceElementProps ?? {},
      this.childMapperProp ?? {},
    )
  }

  @computed
  get evaluatedProps() {
    return this.runtimeContext.props
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
    const children = React.createElement(
      Fragment,
      {},
      this.runtimeComponent.current.children.map((child) => child.render),
    )

    return mergeProps(
      this.component.api.current.defaultValues,
      this.component.props.values,
      this.customProps?.values ?? {},
      {
        children,
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
  get runtimeContext(): IRuntimeContext {
    const context = {
      actions: {},
      componentProps: {},
      props: {},
      refs: {},
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: {},
      urlProps: {},
    }

    context['props'] = evaluateObject(this.renderedTypedProps, context)

    return context
  }

  @computed
  get runtimeStore() {
    return this.runtimeComponent.current.runtimeStore
  }
}
