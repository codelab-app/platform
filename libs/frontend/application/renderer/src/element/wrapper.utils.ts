import type { IRenderOutput } from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  DATA_COMPONENT_ID,
  RendererType,
} from '@codelab/frontend/abstract/domain'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { tx } from '@twind/core'
import omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'
import { getAtom } from '../atoms'

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

let dragImage: HTMLElement | undefined

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

let dragImage: HTMLElement | undefined

export const createDragImage = (name: string) => {
  if (dragImage) {
    dragImage.innerText = name

    return dragImage
  }

  dragImage = document.createElement('div')
  dragImage.style.width = 'auto'
  dragImage.style.height = '40px'
  dragImage.style.position = 'fixed'
  dragImage.style.top = '-400px'
  dragImage.style.borderRadius = '5px'
  dragImage.style.backgroundColor = 'white'
  dragImage.style.textAlign = 'center'
  dragImage.style.display = 'flex'
  dragImage.style.justifyContent = 'center'
  dragImage.style.alignItems = 'center'
  dragImage.style.fontSize = '14px'
  dragImage.style.padding = '5px'
  dragImage.innerText = name
  document.body.appendChild(dragImage)

  return dragImage
}

let transparentDragImage: HTMLElement | undefined

export const createTransparentDragImage = () => {
  if (transparentDragImage) {
    return transparentDragImage
  }

  transparentDragImage = document.createElement('div')
  transparentDragImage.style.width = '1px'
  transparentDragImage.style.height = '1px'
  transparentDragImage.style.opacity = '0'
  document.body.appendChild(transparentDragImage)

  return transparentDragImage
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
