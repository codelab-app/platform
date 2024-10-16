'use client'

import type { ElementWrapperProps } from '@codelab/frontend/abstract/application'

import { RendererType } from '@codelab/frontend/abstract/application'
import { type IComponentType } from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { Fragment, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useSelectionHandlers } from '../hooks'
import { useOverrideAtomProps } from '../hooks/useOverrideAtomProps.hook'
import { DroppableStyledComponent } from './DroppableStyledComponent'
import { generateTailwindClasses, getReactComponent } from './utils'

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({
    errorBoundary: { onError, onReset },
    onRendered,
    renderer,
    renderOutput,
    runtimeElement,
    ...rest
  }) => {
    useEffect(() => {
      onRendered()
    }, [])

    const { atomDomainService } = useDomainStore()

    const ReactComponent: IComponentType =
      renderOutput.atomType &&
      atomDomainService.dynamicComponents[renderOutput.atomType]
        ? atomDomainService.dynamicComponents[renderOutput.atomType] ?? Fragment
        : getReactComponent(renderOutput)

    const tailwindClassNames = {
      className: generateTailwindClasses(
        runtimeElement.element.current.tailwindClassNames,
        renderer.rendererType,
      ),
    }

    const selectionHandlers = useSelectionHandlers(
      runtimeElement,
      renderer.rendererType,
    )

    const propsOverrides = useOverrideAtomProps(
      renderer,
      renderOutput.props,
      renderOutput.atomType,
    )

    // leave ElementWrapper pass-through so refs are attached to correct element
    const mergedProps = mergeProps(
      renderOutput.props,
      rest,
      selectionHandlers,
      tailwindClassNames,
      propsOverrides,
    )

    const isDroppable =
      renderer.rendererType !== RendererType.Production &&
      renderer.rendererType !== RendererType.Preview

    /**
     * children can be either
     *  - a sub tree of elements
     *  - children prop value
     */

    const children =
      runtimeElement.renderChildren ??
      runtimeElement.runtimeProps.renderedChildrenProp

    return (
      <ErrorBoundary
        fallbackRender={() => null}
        onError={onError}
        onReset={onReset}
        resetKeys={[renderOutput]}
      >
        <DroppableStyledComponent
          ReactComponent={ReactComponent}
          componentProps={mergedProps}
          id={runtimeElement.compositeKey}
          isDroppable={isDroppable}
          parentId={runtimeElement.parentElement?.compositeKey}
        >
          {children}
        </DroppableStyledComponent>
      </ErrorBoundary>
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
