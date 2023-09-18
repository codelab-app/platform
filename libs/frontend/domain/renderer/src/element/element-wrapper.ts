import type {
  IComponentType,
  IElementModel,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance, RendererType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { IAtomType } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { getRunner } from '../action-runner.model'
import { useDragDropHandlers, useSelectionHandlers } from '../utils'
import { renderComponentWithStyles } from './get-styled-components'
import { extractValidProps, getReactComponent } from './wrapper.utils'

export interface ElementWrapperProps {
  element: IElementModel
  key: string
  /**
   * Props passed in from outside the component
   */
  renderer: IRenderer
}

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ element, renderer, ...rest }) => {
    useEffect(() => {
      const { postRenderAction, providerStore, store } = element

      const { runner: postRenderActionRunner } = getRunner(
        renderer,
        postRenderAction?.id,
        store.id,
        providerStore?.id,
      )

      if (postRenderActionRunner) {
        const runner = postRenderActionRunner.runner.bind(
          element.expressionEvaluationContext,
        )

        runner()
      }
    }, [])

    const { atomService, builderService, elementService } = useStore()
    // Render the element to an intermediate output
    const renderOutput = renderer.renderIntermediateElement(element)

    renderer.logRendered(element, renderOutput)

    const children = renderer.renderChildren(renderOutput)

    if (renderOutput.props) {
      if (
        isAtomInstance(element.renderType) &&
        element.renderType.current.type === IAtomType.GridLayout
      ) {
        renderOutput.props['static'] =
          renderer.rendererType === RendererType.Preview ||
          renderer.rendererType === RendererType.Production
      }
    }

    const ReactComponent: IComponentType =
      renderOutput.atomType &&
      atomService.dynamicComponents[renderOutput.atomType]
        ? atomService.dynamicComponents[renderOutput.atomType] ?? React.Fragment
        : getReactComponent(renderOutput)

    const extractedProps = extractValidProps(ReactComponent, renderOutput)

    const selectionHandlers = useSelectionHandlers(
      builderService,
      element,
      renderer.rendererType,
    )

    const dragDropHandlers = useDragDropHandlers(
      builderService,
      elementService,
      element,
      renderer.rendererType,
    )

    // leave ElementWrapper pass-through so refs are attached to correct element
    const mergedProps = mergeProps(
      extractedProps,
      rest,
      selectionHandlers,
      dragDropHandlers,
    )

    const renderedElement = renderComponentWithStyles(
      ReactComponent,
      mergedProps,
      children,
    )

    return React.createElement(
      ErrorBoundary,
      {
        fallbackRender: () => null,
        onError: ({ message, stack }) => {
          element.setRenderingError({ message, stack })
        },
        onResetKeysChange: () => {
          element.setRenderingError(null)
        },
        resetKeys: [renderOutput],
      },
      renderedElement,
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
