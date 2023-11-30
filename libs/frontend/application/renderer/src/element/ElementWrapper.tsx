import type { ElementWrapperProps } from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import { type IComponentType } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { DroppableStyledComponent } from './DroppableStyledComponent'
import { useSelectionHandlers } from './useSelectionHandlers.hook'
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
    errorBoundary: { onError, onResetKeysChange },
    onRendered,
    renderer,
    renderOutput,
    runtimeElement,
    ...rest
  }) => {
    useEffect(() => {
      onRendered()
    }, [])

    const { element } = runtimeElement
    const { atomService } = useStore()
    const children = runtimeElement.renderChildren

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
        element.current.tailwindClassNames,
        renderer.rendererType,
      ),
    }

    const extractedProps = extractValidProps(ReactComponent, renderOutput)

    const selectionHandlers = useSelectionHandlers(
      element.current,
      renderer.rendererType,
    )

    // leave ElementWrapper pass-through so refs are attached to correct element
    const mergedProps = mergeProps(
      extractedProps,
      rest,
      selectionHandlers,
      tailwindClassNames,
    )

    return (
      <ErrorBoundary
        fallbackRender={() => null}
        onError={onError}
        onResetKeysChange={onResetKeysChange}
        resetKeys={[renderOutput]}
      >
        <DroppableStyledComponent
          ReactComponent={ReactComponent}
          componentProps={mergedProps}
          id={element.id}
          isDroppable={renderer.rendererType !== RendererType.Production}
          parentId={element.current.closestParentElement?.current.id}
        >
          {children}
        </DroppableStyledComponent>
      </ErrorBoundary>
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
