import { ElementModel } from '@codelab/frontend/modules/element'
import { PropsDataByElementId } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { Fragment, ReactElement, ReactNode } from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { atoms } from '../atoms/atoms'
import { RenderOutput } from './RenderOutput'
import { RenderService } from './RenderService'

export interface ElementWrapperProps {
  renderModel: RenderService
  element: ElementModel
  extraElementProps?: PropsDataByElementId
}

export const ElementWrapper = observer<ElementWrapperProps>(
  ({ renderModel, element, extraElementProps }): ReactElement => {
    const rendered = renderModel.renderElement(
      element,
      extraElementProps?.[element.id],
      extraElementProps,
    )

    const children: Array<ReactNode> = element.childrenList?.map((child, i) =>
      React.createElement(ElementWrapper, {
        key: `element-wrapper-${element.id}-${child.id}-${i}`,
        renderModel: renderModel,
        element: child,
        extraElementProps: {
          ...(Array.isArray(rendered) ? {} : rendered?.descendantPropBindings),
        },
      }),
    )

    if (!rendered) {
      // Render pipe didn't return anything for this element, render just it's children within a fragment
      return React.createElement(Fragment, {}, children)
    }

    if (Array.isArray(rendered)) {
      // Render output returned an array, render each item in the array with each element receiving the same children
      return React.createElement(
        Fragment,
        {},
        rendered.map((r) => renderOutput(r, children)),
      )
    }

    return renderOutput(rendered, children)
  },
)

/** Utility function to convert the RenderOutput and its children to a ReactElement */
const renderOutput = (
  rendered: RenderOutput,
  children: ArrayOrSingle<ReactNode>,
): ReactElement => {
  const ReactComponent = atoms[rendered.atomType]

  if (!ReactComponent) {
    return React.createElement(Fragment)
  }

  return React.createElement(ReactComponent, rendered.props, children)
}

ElementWrapper.displayName = 'ElementWrapper'
