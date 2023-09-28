import type { IRenderOutput } from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_COMPONENT_ID,
} from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import type { ReactElement } from 'react'
import React, { Fragment } from 'react'
import { getAtom } from '../atoms'
import type { DraggableElementProps } from './DraggableElement'
import { DraggableElementWrapper } from './DraggableElementWrapper'

const TextEditor = dynamic(() => import('./text-editor/TextEditor'), {
  ssr: false,
})

const TextRenderer = dynamic(() => import('./text-editor/TextRenderer'), {
  ssr: false,
})

/**
 * Fragments can only have the `key` prop
 *
 * customText is rendered as a child of the component
 * so shouldn't be passed as a prop to the element
 */
export const extractValidProps = (
  ReactComponent: unknown,
  renderOutput: IRenderOutput,
) =>
  ReactComponent === Fragment
    ? { key: renderOutput.props?.['key'] }
    : omit(renderOutput.props, [CUSTOM_TEXT_PROP_KEY])

export const getReactComponent = (renderOutput: IRenderOutput) => {
  // if component does not have atom assigned to the root element
  // use span to hold the component's elements together and it is an html
  // element with the least effect on its child and can be used for dnd
  const atomType =
    !renderOutput.atomType && renderOutput.props?.[DATA_COMPONENT_ID]
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

export const createTextEditor = (
  customText: string,
  elementId: string,
  readOnly?: boolean,
) => {
  return React.createElement(TextEditor, {
    data: customText,
    elementId,
    readOnly,
  })
}

export const createTextRenderer = (customText: string) =>
  React.createElement(TextRenderer, { data: customText })

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
