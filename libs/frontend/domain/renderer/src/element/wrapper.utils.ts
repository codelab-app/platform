import type { IRenderOutput } from '@codelab/frontend/abstract/core'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { ReactElement } from 'react'
import React, { Fragment } from 'react'
import { getAtom } from '../atoms'
import type { DraggableElementProps } from './DraggableElement'
import { DraggableElementWrapper } from './DraggableElementWrapper'

/**
 * Fragments can only have the `key` prop
 */
export const extractValidProps = (
  ReactComponent: unknown,
  renderOutput: IRenderOutput,
) =>
  ReactComponent === Fragment
    ? { key: renderOutput.props?.['key'] }
    : renderOutput.props

export const getReactComponent = (renderOutput: IRenderOutput) => {
  // use span to hold the component's elements together and it is an html
  // element with the least effect on its child and can be used for dnd
  const atomType = renderOutput.props?.[DATA_COMPONENT_ID]
    ? IAtomType.HtmlSpan
    : renderOutput.atomType

  // Render the atom if it exists, otherwise use fragment
  return atomType ? getAtom(atomType) ?? Fragment : Fragment
}

export const makeCustomTextContainer = (customText: string) =>
  React.createElement('div', {
    className: 'ql-container override-ql-container ql-snow',
    dangerouslySetInnerHTML: {
      __html: `<div class="ql-editor override-ql-editor">${customText}</div>`,
    },
  })

export const noWrapper = () => (children: ReactElement) => children

export const makeDraggableElement = ({
  element,
  makeRenderedElements,
}: DraggableElementProps) => {
  return React.createElement(DraggableElementWrapper, {
    element,
    makeRenderedElements,
  })
}
