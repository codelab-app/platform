import type {
  IComponentType,
  IElementModel,
  IRenderer,
  IRenderOutput,
} from '@codelab/frontend/abstract/domain'
import { RendererType } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { getRunner } from '@codelab/frontend/domain/renderer'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import type { ErrorBoundaryProps } from 'react-error-boundary'
import { ErrorBoundary } from 'react-error-boundary'
import { useDragDropHandlers, useSelectionHandlers } from '../utils'
import { renderComponentWithStyles } from './get-styled-components'
import {
  extractValidProps,
  generateTailwindClasses,
  getReactComponent,
} from './wrapper.utils'

export interface ElementWrapperProps {
  element: IElementModel
  errorBoundary: Omit<ErrorBoundaryProps, 'fallbackRender'>
  key: string
  /**
   * Props passed in from outside the component
   */
  renderOutput: IRenderOutput
  renderer: IRenderer
  onRendered(): void
}

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({
    element,
    errorBoundary: { onError, onResetKeysChange },
    onRendered,
    renderer,
    renderOutput,
    ...rest
  }) => {
    useEffect(() => {
      onRendered()
    }, [])

    const { atomService } = useStore()

    renderer.logRendered(renderOutput)

    const children = renderer.renderChildren(renderOutput)

    if (renderOutput.props && renderOutput.atomType === IAtomType.GridLayout) {
      renderOutput.props['static'] =
        renderer.rendererType === RendererType.Preview ||
        renderer.rendererType === RendererType.Production
    }

    const ReactComponent: IComponentType =
      renderOutput.atomType &&
      atomService.dynamicComponents[renderOutput.atomType]
        ? atomService.dynamicComponents[renderOutput.atomType] ?? React.Fragment
        : getReactComponent(renderOutput)

    const tailwindClassNames = {
      className: generateTailwindClasses(
        element.tailwindClassNames,
        renderer.rendererType,
      ),
    }

    const extractedProps = extractValidProps(ReactComponent, renderOutput)

    const selectionHandlers = useSelectionHandlers(
      element,
      renderer.rendererType,
    )

    const dragDropHandlers = useDragDropHandlers(element, renderer.rendererType)

    // leave ElementWrapper pass-through so refs are attached to correct element
    const mergedProps = mergeProps(
      extractedProps,
      rest,
      selectionHandlers,
      dragDropHandlers,
      tailwindClassNames,
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
        onError,
        onResetKeysChange,
        resetKeys: [renderOutput],
      },
      renderedElement,
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
