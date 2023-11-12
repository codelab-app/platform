import type { IRenderOutput } from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_COMPONENT_ID,
} from '@codelab/frontend/abstract/domain'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { tx } from '@twind/core'
import omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'
import { getAtom } from '../atoms'

const TextEditor = dynamic(() => import('../text-editor/TextEditor'), {
  ssr: false,
})

const TextRenderer = dynamic(() => import('../text-editor/TextRenderer'), {
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

export const generateTailwindClasses = (
  classNames: Nullable<Array<string>> | undefined,
  rendererType: RendererType,
) => {
  let classNamesToUse: Array<string> = classNames ?? []

  if (
    rendererType === RendererType.PageBuilder ||
    rendererType === RendererType.ComponentBuilder
  ) {
    classNamesToUse = replaceWithCustomResponsiveVariants(classNames ?? [])
  }

  if (classNamesToUse.length) {
    return tx(`${classNamesToUse.join(' ')}`)
  }

  return ''
}

const replaceWithCustomResponsiveVariants = (classNames: Array<string>) => {
  /**
   * This function will append 'c' to all responsive variants like lg, sm, md, etc
   * We have custom responsive variants that goes by lgc, smc, mdc, etc
   * These custom variants use container query to simulate responsive css in builder mode
   */
  return classNames.map((className) => {
    return className.replace(/(lg|sm|md|xl|2xl):/g, '$1c:')
  })
}
