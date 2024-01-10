import type {
  ElementWrapperProps,
  IRuntimeContainerNodeModel,
  IRuntimeElementDTO,
  IRuntimeElementModel,
  IRuntimeElementPropModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  isRuntimeElement,
  RendererType,
} from '@codelab/frontend/abstract/application'
import {
  CUSTOM_TEXT_PROP_KEY,
  type IElementModel,
  isAtom,
} from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/application/shared/core'
import { Nullable } from '@codelab/shared/abstract/types'
import compact from 'lodash/compact'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { ArrayOrSingle } from 'ts-essentials/dist/types'
import { ElementWrapper } from './element/ElementWrapper'
import { createTextEditor, createTextRenderer } from './element/wrapper.utils'

const create = (dto: IRuntimeElementDTO) => new RuntimeElementModel(dto)

@model('@codelab/RuntimeElement')
export class RuntimeElementModel
  extends Model({
    children:
      prop<
        Array<Ref<IRuntimeContainerNodeModel> | Ref<IRuntimeElementModel>>
      >(),
    closestContainerNode: prop<Ref<IRuntimeContainerNodeModel>>(),
    element: prop<Ref<IElementModel>>(),
    id: idProp,
    runtimeProps: prop<IRuntimeElementPropModel>(),
  })
  implements IRuntimeElementModel
{
  static create = create

  @computed
  get renderer() {
    const activeRenderer = getRendererService(this).activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get runtimeStore() {
    return this.closestContainerNode.current.runtimeStore
  }

  @computed
  get shouldRender() {
    const { renderIfExpression } = this.element.current

    if (!renderIfExpression || !hasStateExpression(renderIfExpression)) {
      return true
    }

    return evaluateExpression(
      renderIfExpression,
      this.runtimeProps.expressionEvaluationContext,
    )
  }

  runPostRenderAction = () => {
    const { postRenderAction } = this.element.current

    if (postRenderAction) {
      const runtimeAction = this.runtimeStore.runtimeAction(postRenderAction)
      const runner = runtimeAction?.runner

      runner?.call(this.runtimeProps.expressionEvaluationContext)
    }
  }

  runPreRenderAction = () => {
    const { preRenderAction } = this.element.current

    if (preRenderAction) {
      const runtimeAction = this.runtimeStore.runtimeAction(preRenderAction)
      const runner = runtimeAction?.runner

      runner?.call(this.runtimeProps.expressionEvaluationContext)
    }
  }

  @computed
  get render(): Nullable<ReactElement> {
    if (this.shouldRender === false) {
      return null
    }

    // Render the element to an intermediate output
    const renderOutput = this.renderer.renderPipe.render(this)
    const children = this.renderChildren

    const wrapperProps: ElementWrapperProps = {
      children,
      element: this.element.current,
      errorBoundary: {
        onError: ({ message, stack }) => {
          this.element.current.setRenderingError({ message, stack })
        },
        onResetKeysChange: () => {
          this.element.current.setRenderingError(null)
        },
      },
      key: this.element.id,
      onRendered: () => {
        this.runPostRenderAction()
      },
      renderer: this.renderer,
      renderOutput,
      runtimeId: this.id,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  /**
   * Renders the elements children
   */
  @computed
  get renderChildren(): ArrayOrSingle<ReactNode> {
    const renderedChildren = compact(
      this.children.map((child) => child.current.render),
    )

    const hasNoChildren = this.children.length === 0
    const hasOneChild = this.children.length === 1

    if (hasNoChildren) {
      // Inject text, but only if we have no regular children
      const injectedText =
        this.runtimeProps.evaluatedProps[CUSTOM_TEXT_PROP_KEY] || '""'

      const shouldInjectText =
        isAtom(this.element.current.renderType.current) &&
        this.element.current.renderType.current.allowCustomTextInjection

      if (shouldInjectText) {
        const readOnly = !this.element.current.isTextContentEditable

        return this.renderer.rendererType === RendererType.Preview ||
          this.renderer.rendererType === RendererType.Production
          ? createTextRenderer(injectedText)
          : createTextEditor(injectedText, this.element.id, readOnly)
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
    if (hasOneChild) {
      return renderedChildren[0]
    }

    return renderedChildren
  }
}
