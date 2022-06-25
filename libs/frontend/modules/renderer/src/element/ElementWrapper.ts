import { IElement, IPropData, IRenderer } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React, {
  createContext,
  Fragment,
  PropsWithChildren,
  useContext,
} from 'react'
import { GlobalPropsContext } from '../props/globalPropsContext'
import { mapOutput } from '../utils/renderOutputUtils'
import {
  childrenAreEmpty,
  extractValidProps,
  getReactComponent,
  makeChildrenPropElement,
  withMaybeGlobalPropsProvider,
} from './wrapper.utils'

export interface ElementWrapperProps {
  renderService: IRenderer
  element: IElement
  /**
   * Props passed in from outside the component
   */
  extraProps?: IPropData
}

// Used to track components up the tree to prevent a render loop if we have circular references between components
interface ComponentRenderContext {
  ancestorComponentIds: Array<string>
}

const ComponentRenderContext = createContext<ComponentRenderContext>({
  ancestorComponentIds: [],
})

const ComponentRenderProviderFactory =
  (currentContext: ComponentRenderContext, element: IElement) =>
  ({ children }: PropsWithChildren<any>) =>
    React.createElement(
      ComponentRenderContext.Provider,
      {
        value: {
          ancestorComponentIds: element.instanceOfComponent?.id
            ? [
                ...currentContext.ancestorComponentIds,
                element.instanceOfComponent?.id,
              ]
            : currentContext.ancestorComponentIds,
        },
      },
      children,
    )

const NullWrapper = ({ children }: PropsWithChildren<any>) =>
  React.createElement(Fragment, {}, children)

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ renderService, element, extraProps }) => {
    const componentRenderContext = useContext(ComponentRenderContext)
    const globalPropsContext = useContext(GlobalPropsContext)
    const globalProps = globalPropsContext?.[element.id]

    if (
      element.instanceOfComponent?.id &&
      componentRenderContext?.ancestorComponentIds.includes(
        element.instanceOfComponent.id,
      )
    ) {
      console.warn(
        `Render loop detected for component id ${element.instanceOfComponent.id}, remove the circular reference`,
      )

      return null
    }

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
      if (renderOutput?.props?.['children'] && hasNoChildren) {
        children = makeChildrenPropElement(renderOutput.props)
      }

      const ReactComponent = getReactComponent(renderOutput)
      const extractedProps = extractValidProps(ReactComponent, renderOutput)

      const IntermediateChildren = jsx(
        ReactComponent,
        mergeProps(extractedProps),
        children,
      )

      const withMaybeProviders = withMaybeGlobalPropsProvider(
        renderOutput,
        globalPropsContext,
      )

      return withMaybeProviders(IntermediateChildren)
    })

    // Wrap with ComponentContext provider if the element has a component
    const ComponentContextWrapper = element.instanceOfComponent?.id
      ? ComponentRenderProviderFactory(componentRenderContext, element)
      : NullWrapper

    return React.createElement(ComponentContextWrapper, { children: Children })
  },
)

ElementWrapper.displayName = 'ElementWrapper'
