import type {
  IPropDataByElementId,
  IRenderOutput,
} from '@codelab/frontend/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { isEmpty } from 'ramda'
import type { ReactElement } from 'react'
import React, { Fragment } from 'react'
import { getAtom } from '../atoms'
import { withGlobalPropsProvider } from '../props/globalPropsContext'
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

/**
 * Wrap it with global props context if it requires it
 */
export const withMaybeGlobalPropsProvider = (
  renderOutput: IRenderOutput,
  globalProps: IPropDataByElementId,
) => {
  const mergedProps = mergeProps(globalProps, renderOutput.globalProps)

  return isEmpty(renderOutput.globalProps)
    ? noWrapper()
    : withGlobalPropsProvider(mergedProps as IPropDataByElementId)
}

export const getReactComponent = (renderOutput: IRenderOutput) =>
  // Render the atom if it exists, otherwise use fragment
  renderOutput.atomType ? getAtom(renderOutput.atomType) ?? Fragment : Fragment

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
