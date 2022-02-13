import { mergeProps } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import React from 'react'
import { atomFactory } from '../atoms'
import { evalCss, logRendered } from '../utils'
import { RenderPipeFactory } from './types'

/**
 * If the element has an atom it renders it, if not - calls next
 */
export const renderAtomPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!element.atom) {
      return next(element, context, props)
    }

    const [ReactComponent, atomProps] = atomFactory({
      atomType: element.atom.type,
      node: element,
    })

    if (!ReactComponent) {
      return next(element, context, props)
    }

    const mergedProps = mergeProps(atomProps, props)

    if (context.inspect) {
      console.group(element.id, element.name)
    }

    const rendered = React.createElement(ReactComponent, {
      ...mergedProps,
      css: element.css ? css(evalCss(element.css)) : undefined,
      children: next(element, context, mergedProps),
    })

    logRendered(rendered, element, context)

    if (context.inspect) {
      console.groupEnd()
    }

    return rendered
  }
