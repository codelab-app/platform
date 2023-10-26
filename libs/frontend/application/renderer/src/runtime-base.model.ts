import { getRendererService } from '@codelab/frontend/abstract/application'
import type { IPageNode, IRuntimeBase } from '@codelab/frontend/abstract/domain'
import { isTypedProp } from '@codelab/frontend/abstract/domain'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, prop } from 'mobx-keystone'

/**
 * The pipeline is as follow
 *
 * node.props -> renderedTypedProps -> evaluatedProps
 */
@model('@codelab/RuntimeBase')
export class RuntimeBase<TNode extends IPageNode>
  extends Model(<Node extends IPageNode>() => ({
    nodeRef: prop<Ref<Node>>(),
  }))<TNode>
  implements
    Omit<IRuntimeBase<TNode>, 'evaluatedProps' | 'evaluatedPropsBeforeRender'>
{
  @computed
  get node() {
    return this.nodeRef.current
  }

  /**
   * Mobx-keystone doesn't support abstract model class
   * a default implementation which will be overridden by child models
   */
  get props() {
    return this.node.props.values
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

      return transformer.transform(value, this.node)
    })
  }

  @computed
  protected get renderer() {
    return getRendererService(this).activeRenderer?.current
  }
}
