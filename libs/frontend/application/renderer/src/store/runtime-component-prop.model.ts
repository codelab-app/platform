import type {
  IRuntimeComponentModel,
  IRuntimeComponentPropDto,
  IRuntimeComponentPropModel,
  IRuntimeContext,
} from '@codelab/frontend-abstract-application'
import type { IPropModel } from '@codelab/frontend-abstract-domain'
import type { IPropData } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import { getRendererService } from '@codelab/frontend-abstract-application'
import {
  DATA_COMPONENT_ID,
  isTypedProp,
} from '@codelab/frontend-abstract-domain'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { evaluateObject } from '@codelab/shared-infra-eval'
import { mapDeep } from '@codelab/shared-utils'
import { computed, observable, set } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { createElement, Fragment } from 'react'

const create = (dto: IRuntimeComponentPropDto) =>
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
    const children = createElement(
      Fragment,
      {},
      this.runtimeComponent.current.children.map(
        (child) => child.current.rendered,
      ),
    )

    return mergeProps(
      this.component.api.current.defaultValues,
      this.component.props.values,
      this.customProps?.values ?? {},
      {
        children,
        [DATA_COMPONENT_ID]: this.component.id,
        key: this.runtimeComponent.current.compositeKey,
      },
    )
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

  renderedTypedProps: IPropData = observable.object<IPropData>(
    {},
    {},
    // do not observe the nested data, this will wrap properties in proxis,
    // and when passing to React.createElement it will case script errors
    { deep: false },
  )

  /**
   * Applies all the type transformers to the props
   */
  @modelAction
  renderTypedProps() {
    const renderedProps = mapDeep(this.props, (value, key) => {
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

    set(this.renderedTypedProps, renderedProps)
  }
}
