import type { IRendererApplicationService } from '@codelab/frontend/abstract/application'
import type {
  ElementWrapperProps,
  IElementModel,
  IRendererModel,
  IRenderOutput,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  CUSTOM_TEXT_PROP_KEY,
  isAtom,
  RendererType,
} from '@codelab/frontend/abstract/domain'
import { RendererDomainService } from '@codelab/frontend/domain/renderer'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import compact from 'lodash/compact'
import { Model, model, prop } from 'mobx-keystone'
import { createTransformer } from 'mobx-utils'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import { ElementWrapper } from './element/element-wrapper'
import { createTextEditor, createTextRenderer } from './element/wrapper.utils'

@model('@codelab/RendererApplicationService')
export class RendererApplicationService
  extends Model({
    rendererDomainService: prop(() => new RendererDomainService({})),
  })
  implements IRendererApplicationService
{
  /**
   * This is the entry point to start the rendering process
   */
  renderRoot(renderer: IRendererModel) {
    const root = renderer.elementTree.maybeCurrent?.rootElement.current
    const providerRoot = renderer.providerTree?.current.rootElement.current
    const parentComponent = root?.parentComponent

    if (!root) {
      console.warn('Renderer: No root element found')

      return null
    }

    if (parentComponent) {
      /**
       * setup runtime props for component builder
       * this is different from the one created in component-render-pipe
       * because the other one creates runtime props for component instances
       * while this one doesn't pass by the component pipe at all
       */
      renderer.addRuntimeProps(componentRef(parentComponent.id))
    }

    return providerRoot && root.page?.current.kind === IPageKind.Regular
      ? this.renderElement(renderer, providerRoot)
      : this.renderElement(renderer, root)
  }

  /**
   * Renders a single Element using the provided RenderAdapter
   */
  renderElement = (
    renderer: IRendererModel,
    element: IElementModel,
  ): Nullable<ReactElement> => {
    // Render the element to an intermediate output
    const renderOutput = renderer.renderIntermediateElement(element)

    if (renderOutput.shouldRender === false) {
      return null
    }

    const wrapperProps: ElementWrapperProps = {
      element,
      errorBoundary: {
        onError: ({ message, stack }) => {
          element.setRenderingError({ message, stack })
        },
        onResetKeysChange: () => {
          element.setRenderingError(null)
        },
      },
      key: element.id,
      onRendered: () => {
        renderer.runPostRenderAction(element)
      },
      renderer,
      renderOutput,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  /**
   * Renders the elements children, createTransformer memoizes the function
   */
  renderChildren = createTransformer(
    ([renderer, { element, props }]: [
      IRendererModel,
      IRenderOutput,
    ]): ArrayOrSingle<ReactNode> => {
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
          return this.renderElement(renderer, child)
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
