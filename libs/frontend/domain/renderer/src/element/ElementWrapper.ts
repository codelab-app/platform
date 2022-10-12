import {
  IElement,
  IInterfaceType,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/domain/element'
import { Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
// eslint-disable-next-line lodash/import-scope
import { difference, keys, values } from 'lodash'
import merge from 'lodash/merge'
import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { GlobalPropsContext } from '../props/globalPropsContext'
import { mapOutput } from '../utils/renderOutputUtils'
import { DraggableElement } from './DraggableElement'
import {
  childrenAreEmpty,
  extractValidProps,
  getReactComponent,
  makeCustomTextContainer,
  withMaybeGlobalPropsProvider,
} from './wrapper.utils'

export interface ElementWrapperProps {
  renderService: IRenderer
  element: IElement
  /**
   * Props passed in from outside the component
   */
  extraProps?: IPropData
  postAction?: Nullish<() => unknown>
}

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ renderService, element, extraProps = {}, postAction }) => {
    const globalPropsContext = useContext(GlobalPropsContext)
    const globalProps = globalPropsContext[element.id]

    useEffect(() => {
      postAction?.()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    removeLeftOverPropsNotDefinedInAtomAPI(element)

    // Render the element to an intermediate output
    const renderOutputs = renderService.renderIntermediateElement(
      element,
      mergeProps(extraProps, globalProps),
    )

    renderService.logRendered(element, renderOutputs)

    // Use mapOutput because the output may be array or a single item
    const Children = mapOutput(renderOutputs, (renderOutput) => {
      // Render the element's children
      let children = renderService.renderChildren(renderOutput)
      const hasNoChildren = childrenAreEmpty(children)

      // Allow for a 'children' prop, but only if we have no regular children
      if (
        hasNoChildren &&
        renderOutput.props &&
        renderOutput.props[CUSTOM_TEXT_PROP_KEY] &&
        element.atom?.current.allowCustomTextInjection
      ) {
        children = makeCustomTextContainer(
          renderOutput.props[CUSTOM_TEXT_PROP_KEY],
        )
      }

      const ReactComponent = getReactComponent(renderOutput)
      const extractedProps = extractValidProps(ReactComponent, renderOutput)

      const IntermediateChildren = jsx(
        ReactComponent,
        // merge because some refs are not resolved
        merge(extraProps, extractedProps),
        children,
      )

      const withMaybeProviders = withMaybeGlobalPropsProvider(
        renderOutput,
        globalPropsContext,
      )

      return withMaybeProviders(IntermediateChildren)
    })

    return React.createElement(
      ErrorBoundary,
      {
        fallbackRender: () => null,
        onError({ message, stack }) {
          element.setRenderingError({ message, stack })
        },
        resetKeys: [renderOutputs],
        onResetKeysChange: () => {
          element.setRenderingError(null)
        },
      },
      // root element is not draggable
      !element.parentElement
        ? React.createElement(Fragment, {}, Children)
        : Array.isArray(Children)
        ? React.createElement(
            // Wrap array of elements with a fragment
            Fragment,
            {},
            DraggableElement({ children: Children, element }),
          )
        : DraggableElement({ children: Children, element }),
    )
  },
)

// Removes keys from element props that are not defined in the atom API
// This is to prevent rendering props left over after deleting it from the atom API
const removeLeftOverPropsNotDefinedInAtomAPI = (element: IElement) => {
  if (element.atom?.current.api.current) {
    const atomApiInterface = element.atom.current.api.current as IInterfaceType
    const atomApiPropsMap = atomApiInterface.fields.items
    const atomApiPropsKeys = values(atomApiPropsMap).map((field) => field.key)
    const elementPropsMap = element.props?.data.data
    const elementPropsKeys = keys(elementPropsMap)
    const keysToOmit = difference(elementPropsKeys, atomApiPropsKeys)

    keysToOmit.forEach((key) => element.props?.delete(key))
  }
}

ElementWrapper.displayName = 'ElementWrapper'
