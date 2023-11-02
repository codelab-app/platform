import type {
  IRendererDto,
  IRendererModel,
  IRendererService,
  IRenderOutput,
} from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import {
  CUSTOM_TEXT_PROP_KEY,
  isAtom,
  pageRef,
} from '@codelab/frontend/abstract/domain'
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
    const providerRoot = renderer.providerTree?.current.rootElement.current
    const parentComponent = root?.parentComponent?.current

    if (!root) {
      console.warn('Renderer: No root element found')

      return null
    }

    // if (parentComponent) {
    //   /**
    //    * setup runtime props for component builder
    //    * this is different from the one created in component-render-pipe
    //    * because the other one creates runtime props for component instances
    //    * while this one doesn't pass by the component pipe at all
    //    */
    //   renderer.addRuntimeComponent(parentComponent)
    // }

    if (providerRoot?.page && root.page?.current.kind === IPageKind.Regular) {
      const runtimeContainerNode = renderer.addRuntimeContainerNode({
        containerNodeRef: pageRef(providerRoot.page.id),
      })

      return renderer.renderElement(providerRoot, runtimeContainerNode)
    }

    if (root.page?.id) {
      const runtimeContainerNode = renderer.addRuntimeContainerNode({
        containerNodeRef: pageRef(root.page.id),
      })

      return renderer.renderElement(root, runtimeContainerNode)
    }

    throw new Error('Page not found')
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
