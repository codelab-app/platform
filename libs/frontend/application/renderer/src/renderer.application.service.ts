import type {
  IRendererDto,
  IRendererModel,
  IRendererService,
  IRenderOutput,
  IRuntimeModel,
} from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { CUSTOM_TEXT_PROP_KEY, isAtom } from '@codelab/frontend/abstract/domain'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import compact from 'lodash/compact'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { createTransformer } from 'mobx-utils'
import type { ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import { createTextEditor, createTextRenderer } from './element/wrapper.utils'
import { Renderer } from './renderer.model'

@model('@codelab/RendererApplicationService')
export class RendererApplicationService
  extends Model({
    activeRenderer: prop<Nullable<Ref<IRendererModel>>>(
      () => null,
    ).withSetter(),
    /**
     * These are renderers for the public, they are keyed by pageId
     */
    renderers: prop(() => objectMap<IRendererModel>()),
  })
  implements IRendererService
{
  @modelAction
  hydrate = (rendererDto: IRendererDto) => {
    let renderer = this.renderers.get(rendererDto.id)

    if (!renderer) {
      renderer = Renderer.create(rendererDto)

      this.renderers.set(rendererDto.id, renderer)
    }

    return renderer
  }

  /**
   * This is the entry point to start the rendering process
   */
  renderRoot(renderer: IRendererModel) {
    const root = renderer.elementTree.maybeCurrent?.rootElement.current
    const parentComponent = root?.parentComponent?.current
    const currentPage = root?.page?.current

    if (!root) {
      console.error('Renderer: No root element found')

      return null
    }

    if (parentComponent) {
      // TODO: render component

      return null
    }

    if (currentPage) {
      return this.renderPage(renderer, currentPage)
    }

    console.error('Renderer: Neither page nor component found')

    return null
  }

  renderPage(renderer: IRendererModel, page: IPageModel) {
    if (page.kind !== IPageKind.Regular) {
      return this.renderContainerNode(renderer, page)
    }

    const providerRoot = renderer.providerTree?.current.rootElement.current
    const providerPage = providerRoot?.page?.current

    if (!providerPage) {
      console.error('Renderer: Provider page not found')

      return null
    }

    return this.renderContainerNode(renderer, providerPage)
  }

  renderContainerNode(
    renderer: IRendererModel,
    containerNode: IComponentModel | IPageModel,
    parent?: IRuntimeModel,
  ) {
    const runtimeContainerNode = renderer.addRuntimeContainerNode(
      containerNode,
      parent,
    )

    return renderer.renderElement(
      containerNode.rootElement.current,
      runtimeContainerNode,
    )
  }

  /**
   * Renders the elements children, createTransformer memoizes the function
   */
  renderChildren = createTransformer(
    ([renderer, { props, runtimeElement }]: [
      IRendererModel,
      IRenderOutput,
    ]): ArrayOrSingle<ReactNode> => {
      const { closestRuntimeContainerNode, element } = runtimeElement
      const childMapperChildren = renderer.getChildMapperChildren(element)

      const childMapperRenderIndex =
        element.children.findIndex(
          (child) => child.id === element.childMapperPreviousSibling?.id,
        ) + 1

      const elementChildren = [...element.children]

      elementChildren.splice(childMapperRenderIndex, 0, ...childMapperChildren)

      const children = [
        ...elementChildren,
        ...renderer.getComponentInstanceChildren(element),
        ...renderer.getChildPageChildren(element),
      ]

      const renderedChildren = compact(
        children.map((child) => {
          return renderer.renderElement(child, closestRuntimeContainerNode)
        }),
      )

      const hasChildren = renderedChildren.length > 0

      if (!hasChildren) {
        // Inject text, but only if we have no regular children
        const injectedText = props?.[CUSTOM_TEXT_PROP_KEY] || '""'

        const shouldInjectText =
          isAtom(element.renderType.current) &&
          element.renderType.current.allowCustomTextInjection

        if (shouldInjectText) {
          const readOnly = !element.isTextContentEditable

          return renderer.rendererType === RendererType.Preview ||
            renderer.rendererType === RendererType.Production
            ? createTextRenderer(injectedText)
            : createTextEditor(injectedText, element.id, readOnly)
        }

        /*
         * It's important to be undefined if we have no children to display,
         * since void components like input will throw an error if their children prop isn't undefined
         */
        return undefined
      }

      /*
       * If we have only one child, just return it.
       * Ant Design doesn't handle array children well in some cases, like Forms
       */
      if (Array.isArray(children) && children.length === 1) {
        return renderedChildren[0]
      }

      return renderedChildren
    },
  )
}
