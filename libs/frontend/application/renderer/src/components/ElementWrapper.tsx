'use client'

import type { ElementWrapperProps } from '@codelab/frontend/abstract/application'
import type { IAtomType } from '@codelab/shared/abstract/core'

import { type IComponentType } from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import { Fragment, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { getAtom } from '../atoms'
import { useSelectionHandlers } from '../hooks'
import { useOverrideAtomProps } from '../hooks/useOverrideAtomProps.hook'
import { StyledComponent } from './StyledComponent'

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

    useEffect(() => {
      runtimeElement.render()
    }, [getSnapshot(runtimeElement.element.current)])

    const getReactComponent = (atomType: IAtomType) =>
      atomDomainService.dynamicComponents[atomType] ||
      getAtom(atomType) ||
      Fragment

    const ReactComponent: IComponentType = renderOutput.atomType
      ? getReactComponent(renderOutput.atomType)
      : Fragment

    const tailwindClassNames = {
      // TODO: fix tailwind support
      // className: generateTailwindClasses(
      //   runtimeElement.element.current.tailwindClassNames,
      //   renderer.rendererType,
      // ),
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

    /**
     * children can be either
     *  - a sub tree of elements
     *  - children prop value
     */

    const children =
      runtimeElement.renderedChildren ??
      runtimeElement.runtimeProps.renderedChildrenProp

    return (
      <ErrorBoundary
        fallbackRender={() => null}
        onError={onError}
        onReset={onReset}
        resetKeys={[renderOutput]}
      >
        <StyledComponent
          ReactComponent={ReactComponent}
          componentProps={mergedProps}
        >
          {children}
        </StyledComponent>
      </ErrorBoundary>
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
