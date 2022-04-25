import {
  IPropData,
  IPropDataByElementId,
  IRenderOutput,
} from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { isEmpty } from 'ramda'
import React, { Fragment, ReactElement } from 'react'
import { atoms } from '../../atoms/atoms'
import { withGlobalPropsProvider } from '../props/globalPropsContext'

/**
 * Fragments can only have the `key` prop
 */
export const extractValidProps = (
  ReactComponent: any,
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
) =>
  isEmpty(renderOutput.globalProps)
    ? noWrapper()
    : withGlobalPropsProvider(mergeProps(globalProps, renderOutput.globalProps))

export const getReactComponent = (renderOutput: IRenderOutput) =>
  // Render the atom if it exists, otherwise use fragment
  renderOutput.atomType ? atoms[renderOutput.atomType] ?? Fragment : Fragment

export const makeChildrenPropElement = (props: IPropData) =>
  React.createElement(Fragment, {}, props['children'])

export const childrenAreEmpty = (children: any) =>
  !children || (Array.isArray(children) && !children.length)

export const noWrapper = () => (children: ReactElement) => children
