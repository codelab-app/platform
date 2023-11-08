import type {
  IRendererDto,
  IRendererModel,
  IRenderPipe,
  IRuntimeContainerNodeModel,
  ITypedPropTransformer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type {
  IElementTree,
  IExpressionTransformer,
} from '@codelab/frontend/abstract/domain'
import { elementTreeRef } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import { throwIfUndefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { ExpressionTransformer } from './expression-transformer.service'
import { defaultPipes, renderPipeFactory } from './renderPipes'
import { RuntimeContainerNodeFactory } from './runtime-container-node.factory'
import { typedPropTransformersFactory } from './typedPropTransformers'

/**
 * Handles the logic of rendering treeElements. Takes in an optional appTree
 *
 * NB! call .init() and wait for it to finish before using .render()
 *
 * Calling .render() renders a single Element (without it's children)
 * This ensures that each render() call can be used for a single isolated observer() - wrapped React Element
 * and it will get re-rendered only if the source Element model is changed
 *
 * The renderPipe and typedPropTransformers replace the previous render pipeline.
 * It's useful to keep them as mobx-keystone models because they can access the context of the state tree
 * which in practice can act as a DI container, so we can get outside data in the render pipeline easily.
 *
 * For example - we use the renderContext from ./renderContext inside the pipes to get the renderer model itself and its tree.
 */

const create = ({ elementTree, rendererType, urlSegments }: IRendererDto) => {
  return new Renderer({
    elementTree: elementTreeRef(elementTree),
    rendererType,
    urlSegments,
  })
}

@model('@codelab/Renderer')
export class Renderer
  extends Model({
    /**
     * Will log the render output and render pipe info to the console
     */
    debugMode: prop(false).withSetter(),
    /**
     * The tree that's being rendered, we assume that this is properly constructed
     */
    elementTree: prop<Ref<IElementTree>>(),
    expressionTransformer: prop<IExpressionTransformer>(
      () => new ExpressionTransformer({}),
    ),
    id: idProp,
    /**
     * Different types of renderer requires behaviors in some cases.
     */
    rendererType: prop<RendererType>(),

    /**
     * The render pipe handles and augments the render process. This is a linked list / chain of render pipes
     */
    renderPipe: prop<IRenderPipe>(() => renderPipeFactory(defaultPipes)),

    /**
     * We register runtimeRootContainerNode when it is created first time
     * it is used internally to avoid creating runtime elements each time
     * provides a way to attach runtime tree to the root store
     */
    runtimeRootContainerNode: prop<Nullable<IRuntimeContainerNodeModel>>(null),
    /**
     * Those transform different kinds of typed values into render-ready props
     */
    typedPropTransformers: prop<ObjectMap<ITypedPropTransformer>>(() =>
      typedPropTransformersFactory(),
    ),
    urlSegments: prop<Record<string, string> | undefined>(),
  })
  implements IRendererModel
{
  static create = create

  @computed
  get page() {
    return this.elementTree.current.rootElement.current.page?.current
  }

  @computed
  get component() {
    return this.elementTree.current.rootElement.current.parentComponent?.current
  }

  @computed
  get containerNode() {
    return throwIfUndefined(this.component ?? this.page)
  }

  @computed
  get rootElement() {
    return this.elementTree.current.rootElement.current
  }

  /**
   * This is the entry point to start the rendering process
   */
  @modelAction
  render() {
    if (this.runtimeRootContainerNode) {
      return this.runtimeRootContainerNode.render
    }

    // we render providerPage before page if exists
    const containerNode = this.component ?? this.page?.providerPage ?? this.page

    if (!containerNode) {
      console.error('Renderer: No page or component found')

      return null
    }

    this.runtimeRootContainerNode = RuntimeContainerNodeFactory.create({
      containerNode,
    })

    return this.runtimeRootContainerNode.render
  }
}
