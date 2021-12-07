import { mergeProps } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import React from 'react'
import { reactComponentFactory } from '../reactComponentFactory'
import { RenderPipeFactory } from '../types/RenderTypes'
import { evalCss } from '../utils/evalCss'
import { onRendered } from '../utils/onRendered'

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
        css={element.css ? css(evalCss(mergedProps, element.css)) : undefined}
      >
        {next(element, context, mergedProps)}
      </RootComponent>
    )

    onRendered(rendered, element, context)

    if (context.inspect) {
      console.groupEnd()
    }

    return rendered
  }
