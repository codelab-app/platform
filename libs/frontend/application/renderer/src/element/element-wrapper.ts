import type {
  ElementWrapperProps,
  IComponentType,
} from '@codelab/frontend/abstract/domain'
import { RendererType } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSelectionHandlers } from '../utils'
import { renderComponentWithStyles } from './get-styled-components'
import {
  extractValidProps,
  generateTailwindClasses,
  getReactComponent,
} from './wrapper.utils'

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

    const { atomService, rendererService } = useStore()

    renderer.logRendered(renderOutput)

    const children = rendererService.renderChildren([renderer, renderOutput])

    if (renderOutput.props && renderOutput.atomType === IAtomType.GridLayout) {
      renderOutput.props['static'] =
        renderer.rendererType === RendererType.Preview ||
        renderer.rendererType === RendererType.Production
    }

    const ReactComponent: IComponentType =
      renderOutput.atomType &&
      atomService.atomDomainService.dynamicComponents[renderOutput.atomType]
        ? atomService.atomDomainService.dynamicComponents[
            renderOutput.atomType
          ] ?? React.Fragment
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

    // leave ElementWrapper pass-through so refs are attached to correct element
    const mergedProps = mergeProps(
      extractedProps,
      rest,
      selectionHandlers,
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
