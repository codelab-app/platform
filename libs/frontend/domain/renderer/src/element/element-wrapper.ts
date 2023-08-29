import type {
  IComponentType,
  IElement,
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
import { shouldRenderElement } from '../utils'
import { renderComponentWithStyles } from './get-styled-components'
import { extractValidProps, getReactComponent } from './wrapper.utils'

export interface ElementWrapperProps {
  element: IElement
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

    const { atomService } = useStore()
    // Render the element to an intermediate output
    const renderOutput = renderer.renderIntermediateElement(element)

    renderer.logRendered(element, renderOutput)

    // TODO: re-work on implementation for the draggable elements and allowable children on the droppable elements.
    // Render the elements normally for now since the DnD is currently not properly working and
    // causing unnecessary re-renders when hovering over the builder screen section
    const children = shouldRenderElement(element, renderOutput.props)
      ? renderer.renderChildren(renderOutput)
      : undefined

    if (renderOutput.props) {
      if (
        isAtomInstance(element.renderType) &&
        element.renderType.current.type === IAtomType.GridLayout
      ) {
        renderOutput.props['static'] =
          renderer.rendererType === RendererType.Preview
      }
    }

    const ReactComponent: IComponentType =
      renderOutput.atomType &&
      atomService.dynamicComponents[renderOutput.atomType]
        ? atomService.dynamicComponents[renderOutput.atomType] ?? React.Fragment
        : getReactComponent(renderOutput)

    const extractedProps = extractValidProps(ReactComponent, renderOutput)
    // leave ElementWrapper pass-through so refs are attached to correct element
    const mergedProps = mergeProps(extractedProps, rest)

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
