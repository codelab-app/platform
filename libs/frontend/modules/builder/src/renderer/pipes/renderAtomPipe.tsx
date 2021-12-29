import { mergeProps } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import React from 'react'
import { logRendered } from '../utils'
import { evalCss } from '../utils/evalCss'
import { reactComponentFactory } from '../utils/reactComponentFactory'
import { RenderPipeFactory } from './types'

/**
 * If the element has an atom it renders it, if not - calls next
 */
export const renderAtomPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!element.atom) {
      return next(element, context, props)
    }

    const [RootComponent, atomProps] = reactComponentFactory({
      atomType: element.atom.type,
      node: element,
    })

    if (!RootComponent) {
      return next(element, context, props)
    }

    const mergedProps = mergeProps(atomProps, props)

    if (context.inspect) {
      console.group(element.id, element.name)
    }

    const rendered = (
      <RootComponent
        {...mergedProps}
        css={element.css ? css(evalCss(element.css)) : undefined}
      >
        {next(element, context, mergedProps)}
      </RootComponent>
    )

    logRendered(rendered, element, context)

    if (context.inspect) {
      console.groupEnd()
    }

    return rendered
  }
