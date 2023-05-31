import type { IPageNode, IRuntimeProp } from '@codelab/frontend/abstract/core'
import { isTypedProp } from '@codelab/frontend/abstract/core'
import { getTypeService } from '@codelab/frontend/domain/type'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './renderPipes/render-pipe.base'

/**
 * The pipeline is as follow
 *
 * node.props ->
 *         preProceedProps ->
 *               renderedTypedProps ->
 *                                evaluatedProps
 */
@model('@codelab/BaseRuntimeProps')
export class BaseRuntimeProps<TNode extends IPageNode>
  extends ExtendedModel(<Node extends IPageNode>() => ({
    baseModel: modelClass<BaseRenderPipe>(BaseRenderPipe),
    props: {
      nodeRef: prop<Ref<Node>>(),
    },
  }))<TNode>
  implements
    Omit<IRuntimeProp<TNode>, 'evaluatedProps' | 'evaluatedPropsBeforeRender'>
{
  /**
   * Mobx-keystone doesn't support abstract model class
   * a default implementation which will be overridden by child models
   */
  get props() {
    return this.node.props.current.values
  }

  get preProceedProps() {
    return this.props
  }

  @computed
  get typeService() {
    return getTypeService(this)
  }

  @computed
  get node() {
    return this.nodeRef.current
  }

  /**
   * Applies all the type transformers to the props
   */
  @computed
  get renderedTypedProps() {
    return mapDeep(this.preProceedProps, (value) => {
      if (!isTypedProp(value)) {
        return value
      }

      if (!value.value) {
        return undefined
      }

      const typeKind = this.typeService.type(value.type)?.kind

      if (!typeKind) {
        return value
      }

      const transformer = this.renderer.typedPropTransformers.get(typeKind)

      if (!transformer) {
        return value
      }

      return transformer.transform(value, this.node)
    })
  }
}
