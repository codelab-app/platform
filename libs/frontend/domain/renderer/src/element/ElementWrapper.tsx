// import re
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {
  CUSTOM_TEXT_PROP_KEY,
  IElement,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import { isRoot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React, { RefObject, useCallback, useContext, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import GridLayout from 'react-grid-layout'
import { GlobalPropsContext } from '../props/globalPropsContext'
import { mapOutput } from '../utils/renderOutputUtils'
import { DraggableElementWrapper } from './DraggableElementWrapper'
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
// forward ref
export const ElementWrapper = observer<ElementWrapperProps>(
  React.forwardRef(
    (
      {
        renderService,
        element,
        extraProps = {},
        postAction,
        style,
        className,
        onMouseDown,
        onMouseUp,
        onTouchEnd,
        ...rest
      },
      ref,
    ) => {
      console.log({ isRoot: extraProps.isRoot, element })

      const isRoot = extraProps.isRoot
      /**
  props
  key = ""
  check pros
  <div {...props}>
     */
      const globalPropsContext = useContext(GlobalPropsContext)
      const globalProps = globalPropsContext[element.id]

      const onRefChange = useCallback(
        (node: Nullable<RefObject<HTMLElement>>) => {
          if (!element.ref && node) {
            element.setRef(node)
          }
        },
        [],
      )

      useEffect(() => {
        postAction?.()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      // Render the element to an intermediate output
      const renderOutputs = renderService.renderIntermediateElement(
        element,
        mergeProps(extraProps, globalProps),
      )

      renderService.logRendered(element, renderOutputs)

      // Use mapOutput because the output may be array or a single item
      const Rendered = mapOutput(renderOutputs, (renderOutput) => {
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

        if (renderOutput.props) {
          renderOutput.props['forwardedRef'] = onRefChange
        }

        const ReactComponent = getReactComponent(renderOutput)
        const extractedProps = extractValidProps(ReactComponent, renderOutput)

        /**
         * is root
         * if root component
         * childrne = <RGL>{children}
         *
         * else children
         */

        console.log('Awesome', ReactComponent)

        const IntermediateChildren = jsx(
          ReactComponent,
          // merge because some refs are not resolved
          mergeProps(extractedProps, rest, {
            style: {
              width: '100%',
              height: '100%',
            },
          }),
          children,
        )

        if (extraProps.isRoot) {
          return children
        }

        // const withMaybeProviders = withMaybeGlobalPropsProvider(
        //   renderOutput,
        //   globalPropsContext,
        // )

        // return withMaybeProviders(IntermediateChildren)
        return IntermediateChildren
      })

      // ref
      // style,className, onMouseDown, onMouseUp and onTouchEnd to that same DOM node.
      // extract props
      // if not root forward tons of stuff include ref
      const bprops = {
        fallbackRender: () => null,
        onError({ message, stack }) {
          element.setRenderingError({ message, stack })
        },
        resetKeys: [renderOutputs],
        onResetKeysChange: () => {
          element.setRenderingError(null)
        },
        // key: element.id,
      }

      const divProps = { style, className, onMouseDown, onMouseUp, onTouchEnd }

      if (isRoot) {
        // return <div>{Rendered}</div>

        return (
          <GridLayout
            className="layout"
            cols={12}
            layout={[
              {
                i: 'random',
                x: 0,
                y: 0,
                w: 1,
                h: 1,
              },
            ]}
            rowHeight={30}
            width={1200}
          >
            {/* <div key="823df7c1-0b8f-47ea-8b42-f86db0d278bc">fun</div> */}
            {Rendered}

            {/* {React.createElement(
            ErrorBoundary,
            bprops,
            React.createElement('div', {
              children: Rendered,
              element,
            }),
          )} */}
          </GridLayout>
        )
      }

      console.log('element id', element.id)

      return (
        <div {...divProps} {...bprops} key={element.id} ref={ref}>
          {Rendered}
          {rest.children}
          {/* <button
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            test
          </button> */}

          {/* {React.createElement(
            ErrorBoundary,
            bprops,
            React.createElement('div', {
              children: Rendered,
              element,
            }),
          )} */}
        </div>
      )
    },
  ),
)

ElementWrapper.displayName = 'ElementWrapper'
