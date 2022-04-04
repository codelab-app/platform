import { Element } from '@codelab/frontend/modules/element'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { isEmpty } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { createContext, Fragment, ReactElement, useContext } from 'react'
import { atoms } from '../atoms/atoms'
import { RenderOutput } from './abstract/RenderOutput'
import type { RenderService } from './RenderService'
import { mapOutput } from './utils/renderOutputUtils'

export interface ElementWrapperProps {
  renderService: RenderService
  element: Element
  extraProps?: PropsData
}

// An observer element wrapper - this makes sure that each element is self-contained and observers only the data it needs
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ renderService, element, extraProps }) => {
    const extraPropsContext = useContext(DescendantBoundPropsContext)
    const extraPropsFromContext = extraPropsContext?.[element.id]

    // Render the element to an intermediate output
    const outputOrArray = renderService.renderElementIntermediate(
      element,
      mergeProps(extraProps, extraPropsFromContext),
    )

    renderService.logRendered(element, outputOrArray)

    // use mapOutput because the output may be array or a single item
    const result = mapOutput(outputOrArray, (renderOutput) => {
      // Render the element's children
      let children = renderService.renderChildren(renderOutput)
      const hasNoChildren = childrenAreEmpty(children)

      // Allow for a 'children' prop, but only if we have no regular children
      if (renderOutput?.props?.['children'] && hasNoChildren) {
        children = makeChildrenPropElenment(renderOutput.props)
      }

      const ReactComponent = getReactComponent(renderOutput)
      const finalProps = removePropsForFragment(ReactComponent, renderOutput)
      const wrapper = wrapperFactory(renderOutput, extraPropsContext)
      const rendered = React.createElement(ReactComponent, finalProps, children)

      return wrapper(rendered)
    })

    // If we have an array, wrap it in a fragment
    return Array.isArray(result)
      ? React.createElement(Fragment, {}, result)
      : result
  },
)

const removePropsForFragment = (
  ReactComponent: any,
  renderOutput: RenderOutput,
) =>
  ReactComponent === Fragment
    ? { key: renderOutput.props?.['key'] }
    : renderOutput.props

const wrapperFactory = (
  renderOutput: RenderOutput,
  extraPropsContext: PropsDataByElementId,
) =>
  // wrap it in a descendant bound props context if it has any descendant bound props
  isEmpty(renderOutput.descendantBoundProps)
    ? noWrapper()
    : withDescendantBoundProps(
        mergeProps(extraPropsContext, renderOutput.descendantBoundProps),
      )

const getReactComponent = (renderOutput: RenderOutput) =>
  // Render the atom if it exists, otherwise use fragment
  renderOutput.atomType ? atoms[renderOutput.atomType] ?? Fragment : Fragment

const makeChildrenPropElenment = (props: PropsData) =>
  React.createElement(Fragment, {}, props['children'])

const childrenAreEmpty = (children: any) =>
  !children || (Array.isArray(children) && !children.length)

// Keep a context of descendant bound props
// that way we can pass props from a parent to any child
// without affecting any other elements in the tree
const DescendantBoundPropsContext = createContext<PropsDataByElementId>({})
const noWrapper = () => (children: ReactElement) => children

const withDescendantBoundProps =
  (extraProps: PropsDataByElementId) => (children: ReactElement) =>
    React.createElement(
      DescendantBoundPropsContext.Provider,
      { value: extraProps },
      children,
    )
