import {
  getRendererService,
  type IRuntimeContainerNodeDTO,
  type IRuntimeContainerNodeModel,
  type IRuntimeElementModel,
  type IRuntimeModel,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  DATA_COMPONENT_ID,
  isComponentRef,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { Maybe } from '@codelab/shared/abstract/types'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'

const create = ({ containerNodeRef, parentRef }: IRuntimeContainerNodeDTO) =>
  new RuntimeContainerNodeModel({ containerNodeRef, parentRef })

@model('@codelab/RuntimeContainerNodeModel')
export class RuntimeContainerNodeModel
  extends Model({
    containerNodeRef: prop<Ref<IComponentModel> | Ref<IPageModel>>(),
    id: idProp,
    parentRef: prop<Maybe<IRuntimeModel>>(),
  })
  implements IRuntimeContainerNodeModel
{
  static create = create

  @computed
  get containerNode() {
    return this.containerNodeRef.current
  }

  @computed
  get componentEvaluatedProps() {
    return mergeProps(
      this.evaluatedProps,
      this.instanceElementProps?.evaluatedProps,
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

      const transformer = this.renderer?.typedPropTransformers.get(value.kind)

      if (!transformer) {
        return value.value
      }

      return transformer.transform(value, this.containerNode)
    })
  }

  @computed
  get evaluatedProps() {
    return evaluateObject(this.renderedTypedProps, {
      actions: {},
      componentProps: {},
      props: {},
      refs: this.containerNode.store.current.refs,
      rendererType: RendererType.Preview,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.containerNode.store.current.state,
      url: {},
    })
  }

  @computed
  get evaluatedPropsBeforeRender() {
    return evaluateObject(this.props, {
      actions: {},
      componentProps: {},
      props: {},
      refs: this.containerNode.store.current.refs,
      rendererType: RendererType.Preview,
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: this.containerNode.store.current.state,
      url: {},
    })
  }

  @computed
  get instanceElementProps(): Maybe<IRuntimeElementModel> {
    if (isComponentRef(this.containerNodeRef)) {
      const instanceElement =
        this.containerNodeRef.current.instanceElement?.current

      return instanceElement
        ? this.renderer?.runtimeElement(instanceElement)
        : undefined
    }
  }

  @computed
  get props() {
    return mergeProps(
      this.containerNode.api.current.defaultValues,
      this.props.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      {
        [DATA_COMPONENT_ID]: this.containerNode.id,
        key: this.containerNode.id,
      },
    )
  }

  @computed
  get renderer() {
    return getRendererService(this).activeRenderer?.current
  }
}
